import { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const MySessions = () => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    const res = await api.get("/my-sessions");
    console.log("📌 My Sessions API:", res.data);
    setSessions(res.data);
  };


  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this session?")) {
      await api.delete(`/my-sessions/${id}`);
      
      setSessions((prev) => prev.filter((s) => s._id !== id));
    }
  };

  
  const handleNewSession = () => {
    navigate("/editor");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
     

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
        

        <h2 className="text-xl sm:text-2xl font-bold">My Sessions</h2>
        

        <button
          onClick={handleNewSession}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full sm:w-auto"
         
        >
          New Session
        </button>
      </div>

      {sessions.length === 0 && (
        <p className="text-gray-500">
          No sessions found. Click New Session to create one.
        </p>
      )}

      <ul className="space-y-4">
        {sessions.map((s) => (
          <li
            key={s._id}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border rounded shadow-sm bg-white space-y-4 sm:space-y-0"
            
          >
            <div>
              <p className="font-semibold text-base sm:text-lg">
                
                {s.title || "(Untitled Session)"}
              </p>
              <p className="text-sm text-gray-500">Status: {s.status}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
             

              <button
                onClick={() => navigate(`/editor/${s._id}`)}
                className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition w-full sm:w-auto"
               
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(s._id)}
                className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition w-full sm:w-auto"
                
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MySessions;
