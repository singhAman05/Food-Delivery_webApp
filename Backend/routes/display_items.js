const express = require("express");
const food_it = require("../models/food_items");
const router = express.Router();

router.post("/display", async (req, res) => {
  try {
    const { category, name, option, image, description } = req.body;
    const Food_items = new food_it({
      category: category,
      name: name,
      option: option,
      image: image,
      description: description,
    });

    await Food_items.save();
    console.log("new items added");
    res.status(200).json({ success: "items added" });
  } catch (err) {
    res.send("server error");
    console.log("shiit");
    console.log(err);
  }
});

router.get("/foodData", async (req, res) => {
  try {
    const val = await food_it.find({});
    res.send({ data: val });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
