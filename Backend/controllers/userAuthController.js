const bcrypt = require("bcrypt");
const generateJWT = require("../utils/jwtGenerator");
const User = require("../database/models/user");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);

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

    // Construct user data excluding sensitive information
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    // Return success response with token and user data
    res.status(200).json({
      message: "Login successful",
      user: userData,
      token,
    });
  } catch (error) {
    // Handle errors
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Handle POST request to register a new user
const registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    await user.save();

    //generting JWT token
    const token = generateJWT(user._id);

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    // Return success response with token and user data
    res.status(200).json({
      message: "Login successful",
      user: userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

//Handle Google Login
const googleAuth = async (req, res, next) => {
  const { g_id_token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: g_id_token,
      audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const token = generateJWT(payload.sub);

    const userData = {
      id: payload.sub,
      name: payload.given_name,
      email: payload.email,
    };
    // Return success response with token and user data
    res.status(200).json({
      message: "Login successful",
      user: userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid Google Token" });
  }
};

module.exports = {
  loginUser,
  registerUser,
  googleAuth,
};
