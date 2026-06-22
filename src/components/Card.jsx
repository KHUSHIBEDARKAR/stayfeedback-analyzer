export default function Card({ icon, title, description }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:-translate-y-2 transition">

      <div className="w-24 h-24 mx-auto rounded-full bg-teal-100 flex items-center justify-center text-5xl mb-6">
        {icon}
      </div>

      <h2 className="text-3xl font-bold text-slate-800 mb-4">
        {title}
      </h2>

      <p className="text-gray-600 text-lg leading-8">
        {description}
      </p>

    </div>
  );
}