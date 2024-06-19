const express = require("express");
const router = express.Router();

const { createSubscriber } = require("../controllers/subscriberController");

router.post("/addSubscriber", createSubscriber);
module.exports = router;
