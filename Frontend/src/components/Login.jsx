import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post("/auth/login", { email, password });
    login(res.data);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700 px-4"> 
      

      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm" 
       
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-2 sm:space-y-0">
          
          <h2 className="text-xl sm:text-2xl font-bold">Login</h2>
          
          <Link
            to="/register"
            className="text-blue-600 hover:underline text-sm sm:text-base"
          >
            Register
          </Link>
        </div>

        <div className="mb-4">
          <input
            type="email"
            name="email"
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
            name="password"
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
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
