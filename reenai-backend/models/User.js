const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  roles: {
    type: [String],
    enum: ["admin", "user", "BOT_MANAGER"],
    default: ["user"],
  },
  photo: {
    type: String,
    default: "/uploads/profile_pictures/default.jpg",
  },
  pseudo: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
