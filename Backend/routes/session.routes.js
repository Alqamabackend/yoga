const express = require("express");
const router = express.Router();
const Session = require("../models/Session");
const auth = require("../middleware/auth");

router.get("/sessions", async (req, res) => {
  try {
    const sessions = await Session.find({ status: "published" });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/my-sessions", auth, async (req, res) => {
  try {
    const sessions = await Session.find({ user_id: req.user.id });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/my-sessions/:id", auth, async (req, res) => {
  try {
    const session = await Session.findOne({
      _id: req.params.id,
      user_id: req.user.id,
    });
    if (!session) return res.status(404).json({ message: "Not found" });
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/my-sessions/save-draft", auth, async (req, res) => {
  const { id, title, tags, json_file_url } = req.body;

  try {
    let session;

    if (id) {
      session = await Session.findOneAndUpdate(
        { _id: id, user_id: req.user.id },
        { title, tags, json_file_url, updated_at: Date.now() },
        { new: true }
      );
    } else {
      session = new Session({
        user_id: req.user.id,
        title,
        tags,
        json_file_url,
        status: "draft",
      });
      await session.save();
    }

    res.json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/my-sessions/publish", auth, async (req, res) => {
  const { id } = req.body;

  try {
    const session = await Session.findOneAndUpdate(
      { _id: id, user_id: req.user.id },
      { status: "published", updated_at: Date.now() },
      { new: true }
    );

    if (!session) return res.status(404).json({ message: "Not found" });

    res.json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/my-sessions/:id", auth, async (req, res) => {
  try {
    const session = await Session.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user.id,
    });

    if (!session) return res.status(404).json({ message: "Session not found" });

    res.json({ message: "Session deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
