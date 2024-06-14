const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  googleAuth,
} = require("../controllers/userAuthController");
const { validateSignup } = require("../middleware/validationMiddleware");

router.post("/login", loginUser);
router.post("/signup", validateSignup, registerUser);
router.post("/googleAuth", googleAuth, (req, res) => {
  // Here you can find or create the user in your database
  const user = req.user;
  // For simplicity, let's just return the user info
  res.status(200).json({ message: "Google authentication successful", user });
});

module.exports = router;
