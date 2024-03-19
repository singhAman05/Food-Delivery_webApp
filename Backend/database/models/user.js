const mongoose = require("mongoose");

// Define user schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    // Validate email format using regex
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    // Validate phone number format using regex
    match: [/^\d{10}$/, "Please fill a valid phone number"],
  },
  password: {
    type: String,
    required: true,
  },
});

// Create User model
const User = mongoose.model("User", userSchema);

module.exports = User;
