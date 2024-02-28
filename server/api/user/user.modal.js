var mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["superAdmin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

var User = mongoose.model("User", userSchema);

module.exports = User;