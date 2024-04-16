var mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
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
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["superAdmin", "admin", "agent"],
      default: "agent",
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    permissions: {
      type: Object,
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

// Define a pre-save hook to validate the user before saving
userSchema.pre("save", function (next) {
  if (this.role === "admin" || this.role === "agent") {
    // Allow brand field to be set
    next();
  } else {
    // If user is not admin or agent, ensure brand is not set
    this.brand = undefined;
    next();
  }
});

var User = mongoose.model("User", userSchema);

module.exports = User;
