import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleRegister(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful! Please login.");

        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });

        window.location.href = "/login";
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">

        <h1 className="text-center text-3xl font-bold text-teal-600 dark:text-teal-400">
          Create Account
        </h1>

        <p className="mt-2 mb-6 text-center text-slate-500 dark:text-slate-400">
          Join Homestay AI Review Analyzer
        </p>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="mb-4 w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-teal-400 dark:focus:ring-teal-900"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="mb-4 w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-teal-400 dark:focus:ring-teal-900"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number (Optional)"
            value={formData.phone}
            onChange={handleChange}
            className="mb-4 w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-teal-400 dark:focus:ring-teal-900"
          />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="mb-4 w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-teal-400 dark:focus:ring-teal-900"
            required
          />

          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mb-2 w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-teal-400 dark:focus:ring-teal-900"
            required
          />

          <label className="mb-6 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="accent-teal-600"
            />
            Show Password
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600 py-3 font-semibold text-white shadow-lg shadow-teal-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-teal-700 hover:to-emerald-700 hover:shadow-teal-500/30 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account ✨"}
          </button>

        </form>

        <p className="mt-6 text-center text-slate-600 dark:text-slate-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-teal-600 transition hover:text-emerald-600 hover:underline dark:text-teal-400 dark:hover:text-emerald-400"
          >
            Login
          </a>
        </p>

      </div>
    </div>
  );
}