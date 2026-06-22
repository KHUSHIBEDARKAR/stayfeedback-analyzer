export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-teal-700">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Total Reviews</h3>
          <p className="text-3xl font-bold">1,250</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Positive Reviews</h3>
          <p className="text-3xl font-bold text-green-600">85%</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Negative Reviews</h3>
          <p className="text-3xl font-bold text-red-600">15%</p>
        </div>

      </div>
    </div>
  );
}