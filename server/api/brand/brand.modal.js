var mongoose = require("mongoose");

var brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    brandEmail: {
      type: String,
    },
    password: {
      type: String,
    },
    logo: {
      type: String,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

var Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
