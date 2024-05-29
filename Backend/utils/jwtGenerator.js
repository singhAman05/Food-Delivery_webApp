const jwt = require("jsonwebtoken");

const generateJWT = (userId) => {
  try {
    // Generate a JWT token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "2d", // Optional expiration
    });
    return token;
  } catch (error) {
    console.error("Error generating JWT:", error);
    return null;
  }
};

module.exports = generateJWT;
