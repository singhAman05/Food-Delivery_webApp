//aquiring the dependencies
const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

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
    }

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

    res.status(201).json({ success: "user register successfully" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
