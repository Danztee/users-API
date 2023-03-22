const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
  fullName: {
    type: "string",
    required: [true, "please enter your full name"],
  },

  email: {
    type: "string",
    required: [true, "please enter your email"],
    unique: true,
    lowercase: true,
  },

  password: {
    type: "string",
    required: [true, "please enter your password"],
  },
});

module.exports = mongoose.model("Auth", authSchema);
