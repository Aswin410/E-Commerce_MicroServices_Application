const express = require("express");
const router = express.Router();

//Mongoose
const mongoose = require("mongoose");
const User = require("./user");

//Connect to db
mongoose
  .connect(
    "mongodb+srv://aswin:aswin@cluster0.zbkkvvb.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error : ", err);
  });

// Routes
router.post("/placeorder", async (req, res) => {
  console.log("Recieved place order request")
  const ostatus = "New";
  const d = new Date();
  const otime = d.toLocaleString();
  const data = await User.findOneAndUpdate(
    { email: req.body.email },
    { $push: { order: { ostatus, otime, ototal: req.body.ototal } } }
  );

  if (data) {
    //console.log(data);
    res.status(200).send("Success");
  } else {
    res.status(500).send("Error");
  }
});

router.patch("/cancelorder", async (req, res) => {
  const data = await User.findOneAndUpdate(
    {
      email: req.body.email,
      "order._id": req.body._id,
    },
    { $set: { "order.$.ostatus": "Cancelled" } }
  );

  if (data) {
    console.log(data);
    res.status(200).send("Success");
  } else {
    res.status(500).send("Error");
  }
});

module.exports = router;
