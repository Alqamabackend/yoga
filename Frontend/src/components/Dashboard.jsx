import { useEffect, useState } from "react";
import api from "../utils/api";

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    api.get("/sessions").then((res) => {
      console.log(res.data);
      setSessions(res.data);
    });
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6"> 
      <h2 className="text-xl sm:text-2xl font-bold mb-6"> 
        All Published Sessions
      </h2>

      {sessions.length === 0 ? (
        <p className="text-gray-600">No sessions found.</p>
      ) : (
        <ul className="space-y-4">
          {sessions.map((s) => (
            <li
              key={s._id}
              className="p-4 sm:p-6 border rounded shadow-sm bg-white hover:shadow-md transition" 
            >
              <p className="font-semibold text-base sm:text-lg"> 
                {s.title}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
