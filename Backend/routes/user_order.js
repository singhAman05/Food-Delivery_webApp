const express = require("express");
const router = express.Router();
const order = require("../models/order");

router.post("/orderData", async (req, res) => {
  const { email, order_data, orderDate } = req.body;
  await order_data.splice(0, 0, { order_date: orderDate });
  // console.log("1231242343242354",email)

  //if email not exisitng in db then create: else: InsertMany()
  const eId = await order.findOne({ email: email });
  console.log(eId);
  if (eId === null) {
    try {
      // console.log(data)
      // console.log("1231242343242354",email)
      const new_order = new order({
        email: email,
        order_data: [order_data],
      });

      await new_order.save().then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error);
      res.send("Server Error", error);
    }
  } else {
    try {
      await order
        .findOneAndUpdate(
          { email: email },
          { $push: { order_data: order_data } }
        )
        .then(() => {
          res.json({ success: true });
        });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  }
});

router.get("/myOrderData", async (req, res) => {
  try {
    console.log(req.body.email);
    const eId = await order.findOne({ email: req.body.email });
    //console.log(eId)
    res.status(200).json({ orderData: eId });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
