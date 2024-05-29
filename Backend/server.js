const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const bodyparse = require("body-parser");
const port = process.env.SERVER_PORT || 5000;
require("./database/connection/conn");

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
const newUser = require("./routes/newuser");
const user = require("./routes/loginUser");
const foodItems = require("./routes/foodData");
app.use("/api/v1", newUser);
app.use("/api/v1", user);
app.use("/api/v1", foodItems);

//accessing local backend index server
app.get("/", (req, res) => {
  res.send("Hello from server");
});

//listening to port
app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});
