var mongoose = require("mongoose");

var ticketTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
  },
  {
    timestamps: true,
  }
);

var TicketType = mongoose.model("TicketType", ticketTypeSchema);

module.exports = TicketType;