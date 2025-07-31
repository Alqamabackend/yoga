import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", { email, password });
    alert("Registered! Now login.");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700 px-4">
      {/* 🔹 Added px-4: mobile pe sides se gap */}
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm"
        // 🔹 Changed: p-6 for tight mobile, sm:p-8 for comfy larger screens
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-2 sm:space-y-0">
          {/* 🔹 Changed: flex-col for mobile, flex-row for larger screens, vertical spacing for mobile */}
          <h2 className="text-xl sm:text-2xl font-bold">Register</h2>
          {/* 🔹 Changed: text-xl mobile, text-2xl sm+ */}
          <Link
            to="/login"
            className="text-blue-600 hover:underline text-sm sm:text-base"
          >
            Login
          </Link>
        </div>

        <div className="mb-4">
          <input
            type="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
