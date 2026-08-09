import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));

    setError("");
  };

  async function handleLogin(e) {
    e.preventDefault();

    const email = formData.email.trim();
    const password = formData.password;

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (!API_URL) {
        throw new Error("API URL is not configured.");
      }

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password.");
      }

      if (!data.token) {
        throw new Error(
          "Login succeeded, but no authentication token was received."
        );
      }

      localStorage.setItem("token", data.token);

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      const savedToken = localStorage.getItem("token");

      if (!savedToken) {
        throw new Error("Unable to save authentication session.");
      }

      if (data.user?.role === "admin") {
        window.location.replace("/admin-dashboard");
      } else {
        window.location.replace("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.message ||
          "Unable to login. Please check your server connection."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">

        {/* Header */}
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold text-teal-600 dark:text-teal-400">
            Welcome Back
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Login to Homestay AI
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300"
            role="alert"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              required
              className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-teal-400 dark:focus:ring-teal-950"
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              Password
            </label>

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              required
              className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-teal-400 dark:focus:ring-teal-950"
            />
          </div>

          {/* Show password */}
          <label className="mb-5 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword((current) => !current)}
              disabled={loading}
              className="h-4 w-4 accent-teal-600"
            />

            Show Password
          </label>

          {/* Remember + Forgot */}
          <div className="mb-6 flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                className="h-4 w-4 accent-teal-600"
              />

              Remember Me
            </label>

            <button
              type="button"
              onClick={() =>
                setError("Password reset is not available yet.")
              }
              className="font-semibold text-teal-600 hover:text-emerald-600 hover:underline dark:text-teal-400 dark:hover:text-emerald-400"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600 p-3 font-semibold text-white shadow-lg shadow-teal-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-teal-700 hover:to-emerald-700 hover:shadow-teal-500/30 focus:outline-none focus:ring-4 focus:ring-teal-200 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-teal-950"
          >
            {loading ? "Logging In..." : "Login →"}
          </button>
        </form>

        {/* Register */}
        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-semibold text-teal-600 hover:text-emerald-600 hover:underline dark:text-teal-400 dark:hover:text-emerald-400"
          >
            Create Account
          </a>
        </p>

      </div>
    </div>
  );
}