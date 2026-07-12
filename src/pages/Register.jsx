import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Server Error");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

      <input
        type="email"
        placeholder="Enter your email"
        className="w-full border rounded-md p-2 mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter your password"
        className="w-full border rounded-md p-2 mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleRegister}
        className="w-full bg-green-600 text-white py-2 rounded-md"
      >
        Register
      </button>

      <p className="text-center mt-4 text-sm text-gray-600">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-green-600 font-semibold hover:underline"
        >
          Login
        </a>
      </p>
    </div>
  );
}