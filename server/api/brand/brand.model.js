var mongoose = require("mongoose");

var brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    logo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

var Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;