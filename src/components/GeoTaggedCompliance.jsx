import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";

// TopoJSON for India
const geoUrl =
  "https://cdn.jsdelivr.net/gh/udit-001/india-maps-data@bcbcba3/topojson/india.json";

// Full static compliance data
const stateData = [
  { state: "Andhra Pradesh", compliance: 70 },
  { state: "Arunachal Pradesh", compliance: 50 },
  { state: "Assam", compliance: 45 },
  { state: "Bihar", compliance: 55 },
  { state: "Chhattisgarh", compliance: 60 },
  { state: "Goa", compliance: 80 },
  { state: "Gujarat", compliance: 75 },
  { state: "Haryana", compliance: 65 },
  { state: "Himachal Pradesh", compliance: 70 },
  { state: "Jharkhand", compliance: 50 },
  { state: "Karnataka", compliance: 60 },
  { state: "Kerala", compliance: 85 },
  { state: "Madhya Pradesh", compliance: 55 },
  { state: "Maharashtra", compliance: 75 },
  { state: "Manipur", compliance: 50 },
  { state: "Meghalaya", compliance: 45 },
  { state: "Mizoram", compliance: 60 },
  { state: "Nagaland", compliance: 50 },
  { state: "Odisha", compliance: 65 },
  { state: "Punjab", compliance: 70 },
  { state: "Rajasthan", compliance: 55 },
  { state: "Sikkim", compliance: 60 },
  { state: "Tamil Nadu", compliance: 80 },
  { state: "Telangana", compliance: 65 },
  { state: "Tripura", compliance: 50 },
  { state: "Uttar Pradesh", compliance: 55 },
  { state: "Uttarakhand", compliance: 70 },
  { state: "West Bengal", compliance: 60 },
  { state: "Delhi", compliance: 85 },
  { state: "Jammu and Kashmir", compliance: 55 },
  { state: "Ladakh", compliance: 50 },
  { state: "Puducherry", compliance: 70 },
  { state: "Chandigarh", compliance: 75 },
  { state: "Daman and Diu", compliance: 65 },
  { state: "Dadra and Nagar Haveli", compliance: 60 },
  { state: "Lakshadweep", compliance: 50 },
  { state: "Andaman and Nicobar Islands", compliance: 55 },
];

// Color mapping function
const getColor = (value) => {
  if (value >= 75) return "#27AE60"; // green
  if (value >= 50) return "#F39C12"; // yellow
  return "#E74C3C"; // red
};

const GeoTaggedCompliance = () => {
  const navigate = useNavigate();

  // Top 5 states by compliance
  const topStates = [...stateData]
    .sort((a, b) => b.compliance - a.compliance)
    .slice(0, 5);

  return (
    <div className="flex flex-col md:flex-row w-full gap-6 p-4 dark:bg-gray-900">
      {/* Map */}
      <div className="w-full md:w-2/3 h-[650px] bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 relative">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 1000, center: [78.9629, 22.5937] }}
          style={{ width: "100%", height: "100%" }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateInfo = stateData.find(
                  (s) =>
                    s.state.toLowerCase() === geo.properties.st_nm?.toLowerCase()
                );
                const color = stateInfo ? getColor(stateInfo.compliance) : "#6B7280"; // gray-500 for dark mode fallback

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={color}
                    stroke="#fff"
                    strokeWidth={0.5}
                    style={{
                      default: { transition: "all 0.3s", outline: "none" },
                      hover: {
                        fill: "#3498DB",
                        cursor: "pointer",
                        filter: "brightness(1.2)",
                      },
                      pressed: { fill: "#2980B9" },
                    }}
                    data-tooltip-id="tooltip"
                    data-tooltip-content={
                      stateInfo
                        ? `${stateInfo.state}: ${stateInfo.compliance}%`
                        : `${geo.properties.st_nm}: No data`
                    }
                    onClick={() =>
                      stateInfo && navigate(`/state/${stateInfo.state}`)
                    }
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
        <ReactTooltip id="tooltip" className="dark:bg-gray-700 dark:text-white" />
      </div>

      {/* Table (top 5 states) */}
      <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 overflow-auto">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Top States Compliance
        </h3>
        <table className="w-full border-collapse text-gray-800 dark:text-gray-200">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-2">State</th>
              <th className="text-left py-2">Compliance</th>
            </tr>
          </thead>
          <tbody>
            {topStates.map((state, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="py-2">{state.state}</td>
                <td className="py-2 flex items-center gap-2">
                  <div
                    className="h-3 w-28 rounded-full"
                    style={{
                      background: `linear-gradient(to right, ${getColor(
                        state.compliance
                      )} ${state.compliance}%, #eee ${state.compliance}%)`,
                      transition: "all 0.3s",
                    }}
                  />
                  <span className="font-medium">{state.compliance}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* View All Button */}
        <button
          onClick={() => navigate("/all-states")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          View All
        </button>
      </div>
    </div>
  );
};

export default GeoTaggedCompliance;
