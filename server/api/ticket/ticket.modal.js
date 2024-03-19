var mongoose = require("mongoose");

var ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
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
    attachments: [{
      url: {
        type: String,
      },
      name: {
        type: String,
      },
    }],
    assignedTo: {
      agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      agentName: {
        type: String,
      },
    },
    description: {
      type: String,
    },
    clientDetails: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

var Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;