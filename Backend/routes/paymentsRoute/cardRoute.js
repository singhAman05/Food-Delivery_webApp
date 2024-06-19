const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");
const { submitOrder } = require("../../controllers/payments/cardController");
router.post("/payment", submitOrder);

module.exports = router;
