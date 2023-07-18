//aquiring the dependencies
const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtKey = "mynameisamanshankarsinghandiamadeveloper";

//setting the router path
const router = express.Router();
const User = require("../models/user");

//path where the data has to be posted
router.post("/register", async (req, res) => {
  const { name, email, location, password } = req.body;

  if (!name || !email || !location || !password) {
    return res.status(422).json({ error: "please fill the feild" });
  }

  try {
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return (
        res.status(422).json({ error: "user already exists" }),
        console.log("user already exists")
      );
    } else {
      //pasword hashing
      const salt = await bcrypt.genSalt(10);
      let secpass = await bcrypt.hash(password, salt);

      //saving details of the user
      const user = new User({
        name: name,
        email: email,
        location: location,
        password: secpass,
      });

      await user.save();
      if (user) {
        jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
          if (err) {
            res
              .status(422)
              .json({ error: "cannot sign in please try again later" }),
              console.log("cannot sign in please try again later");
          } else {
            res
              .status(201)
              .json({ success: "user register successfully", auth: token });
            console.log("user registerd successfully");
          }
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
