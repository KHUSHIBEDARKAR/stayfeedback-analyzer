const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },

    profileImage: {
      type: String,
      default:
        "https://ui-avatars.com/api/?background=0D8ABC&color=fff",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);