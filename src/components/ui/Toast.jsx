export default function Toast({ message, type = "success" }) {
  if (!message) return null;

  const color = type === "error" ? "bg-red-600" : "bg-green-600";

  return (
    <div className={`${color} text-white px-4 py-3 rounded-lg shadow-md`}>
      {message}
    </div>
  );
}