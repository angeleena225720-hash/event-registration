require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Event = require("./models/Event");
const Registration = require("./models/Registration");

const app = express();
app.use(cors());
app.use(express.json());

// Events
app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find().lean();
    for (const e of events) {
      e.totalRegistrations = await Registration.countDocuments({ eventId: e._id });
    }
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/events", async (req, res) => {
  try {
    res.status(201).json(await Event.create(req.body));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put("/api/events/:id", async (req, res) => {
  try {
    res.json(await Event.findByIdAndUpdate(req.params.id, req.body, { new: true }));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/api/events/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    await Registration.deleteMany({ eventId: req.params.id });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Registrations
app.post("/api/events/:id/register", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const exists = await Registration.findOne({ eventId: req.params.id, email });
    if (exists) return res.status(400).json({ message: "Already registered" });
    const reg = await Registration.create({ eventId: req.params.id, name, email, phone });
    res.status(201).json(reg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/events/:id/registrations", async (req, res) => {
  try {
    res.json(await Registration.find({ eventId: req.params.id }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => console.error("DB connection error:", err.message));
