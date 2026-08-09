import {
  MessageSquare,
  Smile,
  Meh,
  Frown,
} from "lucide-react";

export default function DashboardStats({
  total = 0,
  positive = 0,
  neutral = 0,
  negative = 0,
}) {
  const cards = [
    {
      title: "Total Reviews",
      value: total,
      icon: <MessageSquare size={30} />,
      color: "bg-blue-500",
    },
    {
      title: "Positive",
      value: positive,
      icon: <Smile size={30} />,
      color: "bg-green-500",
    },
    {
      title: "Neutral",
      value: neutral,
      icon: <Meh size={30} />,
      color: "bg-yellow-500",
    },
    {
      title: "Negative",
      value: negative,
      icon: <Frown size={30} />,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-lg"
        >
          {/* Card Information */}
          <div>
            <p className="text-sm font-medium text-gray-500">
              {card.title}
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {card.value}
            </h2>
          </div>

          {/* Icon */}
          <div
            className={`${card.color} flex h-16 w-16 items-center justify-center rounded-full text-white`}
          >
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}