// Require the Cloudinary library
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
// Set Cloudinary configuration with secure URLs
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_PUBLIC_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
  secure: true,
});

// Log the configuration to verify
console.log(cloudinary.config());
module.exports = cloudinary;
