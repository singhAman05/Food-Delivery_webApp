const bcrypt = require("bcrypt");
const generateJWT = require("../utils/jwtGenerator");
const User = require("../database/models/user");

// Handle POST request to login
const loginUser = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // If user not found, return error
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if password matches
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // If email and password are correct, generate JWT token
    const token = generateJWT(user._id);

    // Return success response with token
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    // Handle errors
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = loginUser;
