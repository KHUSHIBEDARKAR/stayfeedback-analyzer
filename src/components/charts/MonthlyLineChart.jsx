import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MonthlyLineChart({ data = [] }) {
  const chartData = data.map((item) => ({
    month: item.month,
    reviews: item.count,
  }));

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Monthly Review Trend
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Review activity over the last 6 months
        </p>
      </div>

      {chartData.length === 0 ? (
        <div className="flex h-[320px] items-center justify-center">
          <div className="text-center">
            <div className="text-4xl">📊</div>

            <p className="mt-3 font-semibold text-gray-700 dark:text-gray-200">
              No monthly data available
            </p>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Analyze some reviews to see your trend.
            </p>
          </div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <LineChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12 }}
            />

            <Tooltip
              formatter={(value) => [
                `${value} reviews`,
                "Reviews",
              ]}
            />

            <Line
              type="monotone"
              dataKey="reviews"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}