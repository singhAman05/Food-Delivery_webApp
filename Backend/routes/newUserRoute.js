const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/createUserController");
const { validateInput } = require("../controllers/createUserController");

// Route for registering a new user
router.post("/register", validateInput, registerUser);

module.exports = router;
