import React, { useState } from "react";
import Tesseract from "tesseract.js";
import jsPDF from "jspdf";

const ComplianceUpload = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [textData, setTextData] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setTextData("");
    setAnalysis(null);
  };

  const runOCR = async () => {
    if (!image) return;
    setLoading(true);
    const result = await Tesseract.recognize(image, "eng", {
      logger: (m) => console.log(m),
    });
    const extractedText = result.data.text;
    setTextData(extractedText);
    analyzeCompliance(extractedText);
    setLoading(false);
  };

  const analyzeCompliance = (text) => {
    // Dummy compliance rules – replace with real rules
    const rules = [
      { field: "Price", required: true },
      { field: "Net Weight", required: true },
      { field: "Manufacture Date", required: true },
      { field: "Batch Number", required: true },
    ];

    const analysisResult = rules.map((rule) => {
      const found = text.toLowerCase().includes(rule.field.toLowerCase());
      return {
        field: rule.field,
        compliant: found,
        comment: found
          ? `${rule.field} is present ✅`
          : `${rule.field} is missing ❌`,
      };
    });

    setAnalysis(analysisResult);
  };

  const generateReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Compliance Report", 20, 20);
    analysis.forEach((item, idx) => {
      doc.setFontSize(12);
      doc.text(`${idx + 1}. ${item.comment}`, 20, 30 + idx * 10);
    });
    doc.save("compliance-report.pdf");
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Upload Product Image for Compliance Check
      </h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
      />

      {image && (
        <div className="mb-4">
          <img
            src={image}
            alt="Uploaded"
            className="max-w-xs border rounded-lg"
          />
        </div>
      )}

      <button
        onClick={runOCR}
        disabled={!image || loading}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition mr-3"
      >
        {loading ? "Processing..." : "Analyze Compliance"}
      </button>

      {analysis && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Compliance Analysis
          </h3>
          <ul className="list-disc pl-5 text-gray-800 dark:text-gray-200">
            {analysis.map((item, idx) => (
              <li key={idx}>{item.comment}</li>
            ))}
          </ul>

          <button
            onClick={generateReport}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Generate Report
          </button>
        </div>
      )}
    </div>
  );
};

export default ComplianceUpload;
