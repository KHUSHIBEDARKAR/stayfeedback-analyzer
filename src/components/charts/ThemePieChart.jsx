import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#3b82f6", // Food
  "#10b981", // Cleanliness
  "#f59e0b", // Location
  "#8b5cf6", // Host
  "#ef4444", // Value
  "#06b6d4", // Experience
];

export default function ThemePieChart({
  food = 0,
  cleanliness = 0,
  location = 0,
  host = 0,
  value = 0,
  experience = 0,
}) {
  const data = [
    { name: "Food", value: food },
    { name: "Cleanliness", value: cleanliness },
    { name: "Location", value: location },
    { name: "Host", value: host },
    { name: "Value", value: value },
    { name: "Experience", value: experience },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Theme Distribution
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={110}
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}