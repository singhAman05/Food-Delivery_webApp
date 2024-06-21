const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const bodyparse = require("body-parser");
const port = process.env.SERVER_PORT || 5000;
require("./database/connection/conn");
const errorHandler = require("./middleware/errorMiddleware");

//to access react api in our system of backend
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//using json files
app.use(express.json());
app.use(bodyparse.json());
app.use(bodyparse.urlencoded({ extended: true }));

//path for registering users
const userAuth = require("./routes/userAuthRoute");
const foodItems = require("./routes/foodDataRoute");
const paymentOptions = require("./routes/paymentOptionsRoute");
const cardCheckout = require("./routes/paymentsRoute/cardRoute");
const userOrders = require("./routes/orderRoute");
const addSubscriber = require("./routes/subscriberRoute");

app.use("/api/v1", userAuth);
app.use("/api/v1", foodItems);
app.use("/api/v1", paymentOptions);
app.use("/api/v1/Card", cardCheckout);
app.use("/api/v1", userOrders);
app.use("/api/v1", addSubscriber);

//accessing local backend index server
app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use(errorHandler);

// Listening to port
const server = app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
