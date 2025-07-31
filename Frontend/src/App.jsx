import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import MySessions from "./components/MySessions";
import SessionEditor from "./components/SessionEditor";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {user && <Navbar />}

      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 md:p-8">
        

        <div className="w-full max-w-md sm:max-w-2xl md:max-w-4xl bg-white p-4 sm:p-6 md:p-8 rounded shadow">
         
          <Routes>
            {!user ? (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            ) : (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/my-sessions" element={<MySessions />} />
                <Route path="/editor" element={<SessionEditor />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </>
            )}
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
