import { useState, useEffect } from "react";
import api from "../utils/api";
import { useParams } from "react-router-dom";

const SessionEditor = () => {
  const params = useParams();
  const [id, setId] = useState(params.id || null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [jsonUrl, setJsonUrl] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (id) {
      api.get(`/my-sessions/${id}`).then((res) => {
        setTitle(res.data.title);
        setTags(res.data.tags.join(", "));
        setJsonUrl(res.data.json_file_url);
      });
    }
  }, [id]);

  useEffect(() => {
    if (timeoutId) clearTimeout(timeoutId);

    setTimeoutId(
      setTimeout(async () => {
        const res = await api.post("/my-sessions/save-draft", {
          id,
          title,
          tags: tags.split(",").map((t) => t.trim()),
          json_file_url: jsonUrl,
        });

        if (!id && res.data._id) {
          setId(res.data._id);
          console.log("New draft ID:", res.data._id);
        }
      }, 3000)
    );

    return () => clearTimeout(timeoutId);
  }, [title, tags, jsonUrl]);

  const handlePublish = async () => {
    if (!id) {
      alert("Cannot publish: No session ID found.");
      return;
    }

    await api.post("/my-sessions/publish", { id });
    alert("Session published successfully!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700 px-4">
      

      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-lg">
        

        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
          
          Session Editor
        </h2>

        <div className="space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            value={jsonUrl}
            onChange={(e) => setJsonUrl(e.target.value)}
            placeholder="JSON URL"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={handlePublish}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionEditor;
