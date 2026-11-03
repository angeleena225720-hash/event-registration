const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  venue: { type: String, required: true },
});

module.exports = mongoose.model("Event", eventSchema);
