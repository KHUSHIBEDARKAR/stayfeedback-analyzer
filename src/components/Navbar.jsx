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
    <nav className="sticky top-0 z-50 border-b border-teal-400/20 bg-[#020817]/95 shadow-lg shadow-black/20 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-5 py-3 md:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 text-[#020817] shadow-lg shadow-teal-500/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-teal-500/40">
            <span className="text-2xl">🤖</span>
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-white md:text-xl">
              Homestay AI
            </h1>

            <p className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-400 sm:block">
              Review Intelligence
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex flex-wrap items-center justify-end gap-1 text-sm md:gap-2 md:text-base">

          <NavItem to="/" label="Home" />

          <NavItem to="/about" label="About" />

          <NavItem to="/dashboard" label="Dashboard" />

          <NavItem to="/analyzer" label="Analyzer" />

          {/* Theme button */}
          <button
            onClick={() => setDark(!dark)}
            className="ml-1 rounded-xl border border-teal-400/20 bg-teal-400/10 px-3 py-2 font-semibold text-teal-300 transition-all duration-300 hover:border-teal-400/40 hover:bg-teal-400/20 hover:text-teal-200 md:px-4"
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>

          {/* Login / Logout */}
          {token ? (
            <button
              onClick={handleLogout}
              className="ml-1 rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 font-semibold text-red-300 transition-all duration-300 hover:border-red-400/40 hover:bg-red-500/20 md:px-5"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="ml-1 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-4 py-2 font-bold text-white shadow-lg shadow-teal-500/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-teal-500/40 md:px-5"
            >
              Login
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
}


/* Navigation Item */
function NavItem({ to, label }) {
  return (
    <Link
      to={to}
      className="rounded-xl px-3 py-2 font-semibold text-slate-300 transition-all duration-300 hover:bg-teal-400/10 hover:text-teal-300 md:px-4"
    >
      {label}
    </Link>
  );
}