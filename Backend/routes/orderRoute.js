const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { submitOrder } = require("../controllers/orderController");
router.post("/setOrderDetails", authMiddleware, submitOrder);

module.exports = router;
