"use client"
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface GraphData {
  date: string;
  bookings: number;
}

interface BookingTrendsGraphProps {
  isLoading?: boolean;
  graphData?: GraphData[];
  graphType: "W" | "M" | "Y";
  setGraphType: (type: "W" | "M" | "Y") => void;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded-lg shadow-lg border border-gray-200 text-xs">
        <p className="font-semibold text-gray-900">{label}</p>
        <p className="text-green-600">
          Bookings: <span className="font-semibold">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function BookingTrendsGraph({
  isLoading = false,
  graphData = [],
  graphType,
  setGraphType,
}: BookingTrendsGraphProps) {
  const data = graphData;

  const calculateTrend = () => {
    if (data.length < 2) return { percentage: 0, isPositive: true };

    const firstValue = data[0]?.bookings || 0;
    const lastValue = data[data.length - 1]?.bookings || 0;

    if (firstValue === 0) return { percentage: 0, isPositive: true };

    const percentage = ((lastValue - firstValue) / firstValue) * 100;

    return {
      percentage: Math.abs(percentage).toFixed(1),
      isPositive: percentage >= 0,
    };
  };

  const trend = calculateTrend();

  const handleTimeRangeChange = (type: "W" | "M" | "Y") => {
    setGraphType(type);
  };

  if (isLoading) {
    return (
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3 mb-3"></div>
        <div className="h-48 bg-gray-200 rounded animate-pulse mb-3"></div>
        <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Booking Trends
          </h3>
          <p className="text-xs text-gray-500">Stadium bookings over time</p>
        </div>
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {[
            { key: "W", label: "Week" },
            { key: "M", label: "Month" },
            { key: "Y", label: "Year" },
          ].map((range) => (
            <button
              key={range.key}
              onClick={() => handleTimeRangeChange(range.key as "W" | "M" | "Y")}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                graphType === range.key
                  ? "bg-green-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-48 w-full">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 2,
                right: 2,
                left: 0,
                bottom: 2,
              }}
            >
              <defs>
                <linearGradient
                  id="bookingGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                stroke="#f0f0f0"
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#6b7280" }}
                interval="preserveStartEnd"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#6b7280" }}
                width={20}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="bookings"
                stroke="#16a34a"
                strokeWidth={1.5}
                fill="url(#bookingGradient)"
                fillOpacity={1}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 text-sm">
            No booking data available
          </div>
        )}
      </div>

      <div className="flex items-center justify-end text-xs mt-3">
        {data.length > 0 && trend.percentage !== "0.0" && (
          <span className={`px-2 py-1 rounded-full ${trend.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {trend.isPositive ? '↑' : '↓'} {trend.percentage}% from start
          </span>
        )}
      </div>
    </div>
  );
}