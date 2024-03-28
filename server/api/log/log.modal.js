const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  ticketId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: String,
  previousTicketState: { type: mongoose.Schema.Types.Mixed }, // Store the previous ticket state
  updatedTicketState: { type: mongoose.Schema.Types.Mixed }, // Store the updated ticket state
  // Other log fields
});

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
