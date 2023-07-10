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
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "please fill the feild" });
  }

  try {
    let isMatch = "false";
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      isMatch = await bcrypt.compare(password, userExists.password);
    }
    // console.log(userExists);
    // console.log(isMatch);
    if (userExists && isMatch) {
      jwt.sign({ userExists }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res
            .status(422)
            .json({ error: "cannot sign in please try again later" }),
            console.log("cannot sign in please try again later");
        } else {
          res
            .status(201)
            .json({ success: "user logged successfully", auth: token });
          //   console.log(token);
          console.log("user logged successfully");
        }
      });
    } else {
      res.status(422).json({ error: "cannot sign in please try again later" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
