// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link to="/my-sessions" className="hover:underline">
          My Sessions
        </Link>
        <Link to="/editor" className="hover:underline">
          Editor
        </Link>
      </div>

      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
        {user ? (
          <>
            <span className="text-sm">Welcome, {user.email}</span>
            <button
              onClick={logout}
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
