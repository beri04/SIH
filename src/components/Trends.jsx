import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { Tooltip as ReactTooltip } from "react-tooltip";

// Sample data
const categoryData = [
  { name: "Electronics", value: 120, info: "Mostly compliant" },
  { name: "Clothing", value: 90, info: "Some violations" },
  { name: "Home Appliances", value: 60, info: "Few violations" },
];

const platformData = [
  { platform: "Amazon", compliant: 80, nonCompliant: 70 },
  { platform: "Flipkart", compliant: 50, nonCompliant: 50 },
  { platform: "Snapdeal", compliant: 30, nonCompliant: 20 },
];

const recentViolations = [
  { product: "Weight Scale", platform: "Amazon", category: "Electronics", violation: "Overweight" },
  { product: "Juicer", platform: "Flipkart", category: "Home Appliances", violation: "Undersized" },
  { product: "T-shirt", platform: "Amazon", category: "Clothing", violation: "Incorrect labeling" },
];

const COLORS = ["#3c437c", "#6c5ce7", "#fd79a8"];

const Trends = () => {
  const totalCategories = categoryData.length;
  const totalViolations = categoryData.reduce((acc, c) => acc + c.value, 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-10">
      {/* Top Section: Split into two halves */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left: Category Donut */}
        <div className="flex-1 flex flex-col items-center bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-[#3c437c] font-bold text-xl mb-4">Category Trends</h2>
          <div className="relative w-64 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={3}
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      data-tooltip-id="category-tooltip"
                      data-tooltip-content={`${entry.name}: ${entry.value} products`}
                    />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Info */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-lg font-bold text-[#3c437c]">{totalCategories} Categories</p>
              <p className="text-sm text-gray-500">{totalViolations} Violations</p>
            </div>
          </div>
          <ReactTooltip id="category-tooltip" place="top" type="dark" effect="solid" />
        </div>

        {/* Right: Platform Stacked Bar */}
        <div className="flex-1 flex flex-col bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-[#3c437c] font-bold text-xl mb-4">Trends by Platform</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={platformData}>
              <XAxis dataKey="platform" stroke="#3c437c" />
              <YAxis stroke="#3c437c" />
              <RechartsTooltip />
              <Legend />
              <Bar dataKey="compliant" stackId="a" fill="#6c5ce7" />
              <Bar dataKey="nonCompliant" stackId="a" fill="#fd79a8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section: Recent Violations */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-[#3c437c] font-bold text-xl mb-4">Recent Violations</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#3c437c] text-white">
            <tr>
              <th className="py-3 px-4 text-left">Product</th>
              <th className="py-3 px-4 text-left">Platform</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Violation</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentViolations.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-100 cursor-pointer" data-tooltip-id="violations" data-tooltip-content={item.violation}>
                <td className="py-3 px-4">{item.product}</td>
                <td className="py-3 px-4">{item.platform}</td>
                <td className="py-3 px-4">{item.category}</td>
                <td className="py-3 px-4">{item.violation}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactTooltip id="violations" place="top" type="dark" effect="solid" />
      </div>
    </div>
  );
};

export default Trends;

