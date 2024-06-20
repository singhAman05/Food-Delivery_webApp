const express = require("express");
const router = express.Router();
const {
  getUserOrders,
  setUserOrder,
} = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/getUserOrders", getUserOrders);
router.post("/setUserOrders", setUserOrder);

module.exports = router;
