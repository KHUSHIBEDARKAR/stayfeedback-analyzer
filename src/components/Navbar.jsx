import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-teal-900 to-green-600 text-white px-4 md:px-12 py-4 flex justify-between items-center">

      <h1 className="text-2xl md:text-4xl font-bold">
        🤖 Homestay AI
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-sm md:text-xl">

        <Link to="/">Home</Link>

        <Link to="/about">About</Link>

        <Link to="/dashboard">Dashboard</Link>

        <Link
          to="/login"
          className="bg-white text-teal-700 px-3 py-1 md:px-5 md:py-2 rounded-lg font-semibold"
        >
          Login
        </Link>

      </div>

    </nav>
  );
}