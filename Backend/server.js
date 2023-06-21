//requiring dependencies
const express = require("express");
let app = express();
const bodyparse = require("body-parser");

//requiring port
const port = process.env.port || 8000;

//adding database connection
require("./database/conn");

//to access react api in our system of backend
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
app.use("/signup", require("./routes/createUser"));

//accessing local backend index server
app.get("/", (req, res) => {
  res.send("Hello");
});

// //testing post path
// app.post("/food", (req, res) => {
//   console.log(req.body);
// });

//listening to port
app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});
