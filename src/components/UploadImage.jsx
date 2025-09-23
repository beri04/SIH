import React, { useState } from "react";
import AnnouncementBar from "./AnnouncementBar";
import LogoWithTagline from "./LogoWithTagline";
import NavBar from "./Navbar";

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setAnalysis(null); // Reset previous analysis
  };

  const handleProcess = async () => {
    if (!file) return alert("Please upload an image first!");
    setLoading(true);

    // Mock OCR & compliance check
    setTimeout(() => {
      const mockResult = {
        compliance: Math.random() > 0.5 ? "Compliant" : "Non-Compliant",
        details: [
          { rule: "Weight Label", status: "Missing" },
          { rule: "Price Label", status: "Correct" },
          { rule: "Manufacturer Info", status: "Correct" },
        ],
      };
      setAnalysis(mockResult);
      setLoading(false);
    }, 1500);
  };

  const handleGenerateReport = () => {
    if (!analysis) return;
    const reportText = `
    Compliance Report
    ----------------
    Overall: ${analysis.compliance}

    Details:
    ${analysis.details.map(d => `- ${d.rule}: ${d.status}`).join("\n")}
    `;
    const blob = new Blob([reportText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "compliance_report.txt";
    link.click();
  };

  return (
    <div>
    <AnnouncementBar/>
    <LogoWithTagline/>
    <NavBar/>
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Image for Compliance Check</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      <button
        onClick={handleProcess}
        className="bg-blue-600 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
      >
        {loading ? "Processing..." : "Process Image"}
      </button>

      {analysis && (
        <div className="mt-6 border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Analysis Result</h2>
          <p className="mb-2">
            <strong>Overall Compliance:</strong> {analysis.compliance}
          </p>
          <ul className="list-disc pl-5">
            {analysis.details.map((d, i) => (
              <li key={i}>
                {d.rule}: {d.status}
              </li>
            ))}
          </ul>

          <button
            onClick={handleGenerateReport}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Generate Report
          </button>
        </div>
      )}
    </div></div>
  );
};

export default UploadImage;
