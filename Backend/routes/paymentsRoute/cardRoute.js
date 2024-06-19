const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");
const {
  submitOrder,
  retrieveSession,
} = require("../../controllers/payments/cardController");
router.post("/payment", submitOrder);

router.post("/retrieve_session", retrieveSession);

module.exports = router;
