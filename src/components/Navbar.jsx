import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { dark, setDark } = useTheme();

  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  return (
    <nav className="bg-gradient-to-r from-teal-900 to-green-600 text-white px-4 md:px-12 py-4 flex flex-wrap justify-between items-center gap-4">
      <h1 className="text-2xl md:text-4xl font-bold">
        🤖 Homestay AI
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-sm md:text-xl">
        <Link to="/">Home</Link>

        <Link to="/about">About</Link>

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/analyzer">Analyzer</Link>

        <button
          onClick={() => setDark(!dark)}
          className="bg-white text-teal-700 px-3 py-1 rounded-lg font-semibold"
        >
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>

        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 md:px-5 md:py-2 rounded-lg font-semibold"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-white text-teal-700 px-3 py-1 md:px-5 md:py-2 rounded-lg font-semibold"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}