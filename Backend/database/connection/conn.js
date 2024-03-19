const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);

// MongoDB connection URI
const MONGODB_URI = process.env.DB_URI;
// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
