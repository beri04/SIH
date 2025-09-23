import React, { useState } from "react";
import { Upload, Loader2, Download } from "lucide-react";
import { motion } from "framer-motion";
import { createWorker } from "tesseract.js";

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [ocrText, setOcrText] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  // Upload image handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setOcrText("");
      setReport(null);
    }
  };

  // Run OCR with Tesseract.js
  const handleRunOCR = async () => {
    if (!image) return alert("Please upload an image first");

    setLoading(true);
    setProgress(0);

    const worker = await createWorker("eng", 1, {
      logger: (m) => {
        if (m.status === "recognizing text") {
          setProgress(Math.floor(m.progress * 100));
        }
      },
    });

    const { data } = await worker.recognize(image);
    setOcrText(data.text);
    await worker.terminate();
    setLoading(false);

    generateComplianceReport(data.text);
  };

  // Generate compliance report
  const generateComplianceReport = (text) => {
    const rules = [
      { label: "Name & Address", keywords: ["name", "address"] },
      { label: "Net Quantity", keywords: ["net quantity", "weight", "measure"] },
      { label: "MRP", keywords: ["mrp", "price", "retail sale price"] },
      { label: "Consumer Care", keywords: ["consumer care", "helpline", "customer care"] },
      { label: "Date", keywords: ["date of manufacture", "import date", "date"] },
      { label: "Country", keywords: ["country of origin", "made in"] },
    ];

    const lowerText = text.toLowerCase();
    const results = rules.map((rule) => {
      const found = rule.keywords.some((k) => lowerText.includes(k));
      return { field: rule.label, status: found ? "✅ Present" : "❌ Missing" };
    });

    setReport(results);
  };

  // Download report as JSON
  const handleDownloadReport = () => {
    if (!report) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "compliance_report.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6">
      <motion.div
        className="bg-white border rounded-xl shadow-lg p-6 w-full max-w-lg text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Drag and Drop Upload */}
        <label className="block border-2 border-dashed border-gray-300 p-6 rounded-xl cursor-pointer hover:border-blue-500 transition">
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          <Upload className="mx-auto h-10 w-10 text-gray-500" />
          <p className="text-gray-600 mt-2">Drag & Drop or Click to Upload</p>
        </label>

        {/* Preview Uploaded Image */}
        {image && (
          <motion.img
            src={image}
            alt="Preview"
            className="mt-4 rounded-lg max-h-60 mx-auto shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}

        {/* Run OCR Button */}
        <button
          onClick={handleRunOCR}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Processing..." : "Run OCR & Generate Report"}
        </button>

        {/* Progress Loader */}
        {loading && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <Loader2 className="animate-spin text-blue-500" />
            <p className="text-blue-600 text-sm">Reading Text... {progress}%</p>
          </div>
        )}

        {/* Compliance Report */}
        {ocrText && !loading && report && (
          <motion.div
            className="mt-6 text-left bg-gray-50 p-4 rounded-lg"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h3 className="font-bold text-lg mb-2">Compliance Report</h3>
            <ul className="space-y-1">
              {report.map((r, i) => (
                <li key={i} className="flex justify-between border-b py-1">
                  <span>{r.field}</span>
                  <span>{r.status}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={handleDownloadReport}
              className="mt-4 flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              <Download className="h-4 w-4" /> Download Report
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default UploadImage;










