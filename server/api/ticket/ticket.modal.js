var mongoose = require("mongoose");

var ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    relatedTo: {
      type: String,
      required: true,
    },
    attchments: {
      url: {
        type: String,
      },
      name: {
        type: String,
      },
    },
    assignedTo: {
      agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      agentName: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

var Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;