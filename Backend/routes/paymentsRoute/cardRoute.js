const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");
const { submitOrder } = require("../../controllers/payments/cardController");
router.post("/payment", authMiddleware, submitOrder);

module.exports = router;
