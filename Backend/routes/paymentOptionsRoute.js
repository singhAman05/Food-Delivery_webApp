const express = require("express");
const router = express.Router();
const {
  getPaymentOptions,
  setPaymentOptions,
} = require("../controllers/paymentOptionController");
//route for geting food Items
router.get("/getPaymentOptions", getPaymentOptions);
router.post("/setPaymentOptions", setPaymentOptions);

module.exports = router;
