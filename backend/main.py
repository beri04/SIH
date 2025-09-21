import os
import datetime
import hashlib
import hmac
import json
import requests
from typing import Generator, Optional

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import Column, Float, Integer, String, Text, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session, sessionmaker
from dotenv import load_dotenv

# ---------------- Load Env Vars ----------------
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./dev.db")
ACCESS_KEY = os.getenv("AWS_ACCESS_KEY", "")
SECRET_KEY = os.getenv("AWS_SECRET_KEY", "")
PARTNER_TAG = os.getenv("PARTNER_TAG", "")
REGION = "us-east-1"
HOST = "webservices.amazon.in"
ENDPOINT = "https://webservices.amazon.in/paapi5/getitems"
SERVICE = "ProductAdvertisingAPI"

# ---------------- Database Config ----------------
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(DATABASE_URL, connect_args=connect_args, echo=False)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class ProductDB(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(512), nullable=False, index=True)
    sku = Column(String(128), nullable=True, index=True)
    manufacturer = Column(String(256), nullable=True)
    mrp = Column(Float, nullable=True)
    net_quantity = Column(String(64), nullable=True)
    country_of_origin = Column(String(128), nullable=True)
    ocr_text = Column(Text, nullable=True)
    hardware_weight = Column(Float, nullable=True)


class ProductCreate(BaseModel):
    title: str
    mrp: Optional[float] = None
    manufacturer: Optional[str] = None
    sku: Optional[str] = None
    net_quantity: Optional[str] = None
    country_of_origin: Optional[str] = None
    ocr_text: Optional[str] = None
    hardware_weight: Optional[float] = None


class ProductOut(ProductCreate):
    id: int

    class Config:
        from_attributes = True


app = FastAPI(title="SIH compliance backend - Minimal API")

# CORS for React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)


# ---------------- DB Endpoints ----------------
@app.post("/products", response_model=ProductOut)
def create_product(payload: ProductCreate, db: Session = Depends(get_db)):
    db_item = ProductDB(**payload.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@app.get("/products/{product_id}", response_model=ProductOut)
def get_product(product_id: int, db: Session = Depends(get_db)):
    item = db.query(ProductDB).filter(ProductDB.id == product_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Product Not Found")
    return item


# ---------------- Amazon Helpers ----------------
def sign(key, msg):
    return hmac.new(key, msg.encode("utf-8"), hashlib.sha256).digest()


def get_signature_key(key, date_stamp, region_name, service_name):
    k_date = sign(("AWS4" + key).encode("utf-8"), date_stamp)
    k_region = sign(k_date, region_name)
    k_service = sign(k_region, service_name)
    k_signing = sign(k_service, "aws4_request")
    return k_signing


# ---------------- Amazon API Endpoint ----------------
@app.get("/get-product/{asin}")
def get_amazon_product(asin: str):
    if not ACCESS_KEY or not SECRET_KEY or not PARTNER_TAG:
        # fallback dummy response for testing
        return {
            "title": "Demo Product",
            "image": "https://via.placeholder.com/200",
            "price": "₹999",
        }

    payload = {
        "ItemIds": [asin],
        "Resources": [
            "Images.Primary.Large",
            "ItemInfo.Title",
            "Offers.Listings.Price",
        ],
        "PartnerTag": PARTNER_TAG,
        "PartnerType": "Associates",
        "Marketplace": "www.amazon.in",
    }

    amz_target = "com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems"
    content_type = "application/json; charset=UTF-8"

    t = datetime.datetime.utcnow()
    amz_date = t.strftime("%Y%m%dT%H%M%SZ")
    date_stamp = t.strftime("%Y%m%d")

    canonical_uri = "/paapi5/getitems"
    canonical_headers = (
        "content-encoding:utf-8\n"
        + "content-type:" + content_type + "\n"
        + "host:" + HOST + "\n"
        + "x-amz-date:" + amz_date + "\n"
        + "x-amz-target:" + amz_target + "\n"
    )
    signed_headers = "content-encoding;content-type;host;x-amz-date;x-amz-target"

    request_payload = json.dumps(payload)
    payload_hash = hashlib.sha256(request_payload.encode("utf-8")).hexdigest()

    canonical_request = (
        "POST\n"
        + canonical_uri
        + "\n\n"
        + canonical_headers
        + "\n"
        + signed_headers
        + "\n"
        + payload_hash
    )

    algorithm = "AWS4-HMAC-SHA256"
    credential_scope = date_stamp + "/" + REGION + "/" + SERVICE + "/aws4_request"
    string_to_sign = (
        algorithm
        + "\n"
        + amz_date
        + "\n"
        + credential_scope
        + "\n"
        + hashlib.sha256(canonical_request.encode("utf-8")).hexdigest()
    )

    signing_key = get_signature_key(SECRET_KEY, date_stamp, REGION, SERVICE)
    signature = hmac.new(
        signing_key, string_to_sign.encode("utf-8"), hashlib.sha256
    ).hexdigest()

    authorization_header = (
        algorithm
        + " "
        + "Credential=" + ACCESS_KEY + "/" + credential_scope + ", "
        + "SignedHeaders=" + signed_headers + ", "
        + "Signature=" + signature
    )

    headers = {
        "Content-Encoding": "utf-8",
        "Content-Type": content_type,
        "Host": HOST,
        "X-Amz-Date": amz_date,
        "X-Amz-Target": amz_target,
        "Authorization": authorization_header,
    }

    response = requests.post(ENDPOINT, data=request_payload, headers=headers)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)

    data = response.json()
    try:
        item = data["ItemsResult"]["Items"][0]
        return {
            "title": item["ItemInfo"]["Title"]["DisplayValue"],
            "image": item["Images"]["Primary"]["Large"]["URL"],
            "price": item["Offers"]["Listings"][0]["Price"]["DisplayAmount"],
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error parsing API response: {e}")
