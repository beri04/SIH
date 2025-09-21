import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Initial summary values
const initialSummaryData = [
  { title: "Products Scanned", value: 1200 },
  { title: "Compliant Products", value: 950 },
  { title: "Non-Compliant Products", value: 180 },
  { title: "Pending", value: 70 },
];

// Initial chart data
const initialChartData = [
  { day: "Mon", scanned: 200 },
  { day: "Tue", scanned: 400 },
  { day: "Wed", scanned: 600 },
  { day: "Thu", scanned: 800 },
  { day: "Fri", scanned: 1000 },
  { day: "Sat", scanned: 1200 },
];

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const DashboardSummary = () => {
  const [summaryData, setSummaryData] = useState(initialSummaryData);
  const [chartData, setChartData] = useState(initialChartData);
  const [isCrawling, setIsCrawling] = useState(true);

  // Dynamic update simulation
  useEffect(() => {
    if (!isCrawling) return;

    const interval = setInterval(() => {
      // Update summary numbers
      setSummaryData((prevData) =>
        prevData.map((item) => ({
          ...item,
          value: item.value + Math.floor(Math.random() * 20),
        }))
      );

      // Update chart data
      setChartData((prevChart) => {
        const lastIndex = daysOfWeek.indexOf(prevChart[prevChart.length - 1].day);
        const nextIndex = (lastIndex + 1) % daysOfWeek.length;
        const nextDay = daysOfWeek[nextIndex];
        const lastValue = prevChart[prevChart.length - 1].scanned;
        const nextValue = lastValue + Math.floor(Math.random() * 50);

        const newChart = [...prevChart, { day: nextDay, scanned: nextValue }];
        return newChart.slice(-6); // Keep last 6 points visible
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isCrawling]);

  return (
    <div className="mt-5 w-full flex flex-col md:flex-row gap-4 px-4 md:px-6">
      {/* Left: Summary Cards */}
      <div className="w-full md:w-1/2 flex flex-wrap gap-4">
        {summaryData.map((item, idx) => (
          <Card
            key={idx}
            className="w-[48%] p-5 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
          >
            <CardHeader>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200">
                {item.title}
              </h3>
            </CardHeader>
            <CardContent>
              <p
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-2"
                style={{ color: "#3c437c" }}
              >
                {item.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Right: Live Crawling + Analytics */}
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        {/* Live Crawling Panel */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg flex flex-col gap-3">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            Live Crawling
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Crawling is currently{" "}
            <span className="font-bold">{isCrawling ? "Running" : "Stopped"}</span>
          </p>
          <div className="flex gap-3">
            {isCrawling ? (
              <button
                onClick={() => setIsCrawling(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Stop
              </button>
            ) : (
              <button
                onClick={() => setIsCrawling(true)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Start
              </button>
            )}
          </div>
        </div>

        {/* Analytics / Charts */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            Analytics / Charts
          </h3>
          <div className="h-64 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid stroke="#e0e0e0" strokeDasharray="4 4" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="scanned"
                  stroke="#3c437c"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;

