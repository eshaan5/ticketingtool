var mongoose = require("mongoose");

var ticketRelationSchema = new mongoose.Schema(
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

var TicketRelation = mongoose.model("TicketRelation", ticketRelationSchema);

module.exports = TicketRelation;
