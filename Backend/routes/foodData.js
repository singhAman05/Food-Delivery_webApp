const express = require("express");
const router = express.Router();
const {
  getFoodItems,
  setFoodItems,
} = require("../controllers/foodItemController");

//route for geting food Items
router.get("/getFoodItems", getFoodItems);
router.post("/setFoodItems", setFoodItems);

module.exports = router;
