const cloudinary = require("./index");
const path = require("path");
const fs = require("fs");

const uploadImage = async (imagePath) => {
  // Define upload options
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Check if the image file exists
    if (!fs.existsSync(imagePath)) {
      throw new Error(`Image file not found: ${imagePath}`);
    }
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log(result);

    return result.secure_url;
  } catch (error) {
    throw error;
  }
};

module.exports = { uploadImage };
