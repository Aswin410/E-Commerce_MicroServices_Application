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
router.post("/getorders", async (req, res) => {
  const data = await User.findOne({
    email: req.body.email,
  });

  if (!data || !data.order) res.status(401).send("Error");
  else {
    // console.log(data);
    res.status(200).json(data.order);
  }
});

router.post("/login", async (req, res) => {
  const data = await User.findOne({
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
  });

  if (!data) res.status(401).send("Error");
  else {
    // console.log(data);
    res.status(200).send("Success");
  }
});

router.post("/register", async (req, res) => {
  console.log("received register request")
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    isAdmin: req.body.isAdmin,
    order: [],
  });

  const data = await user.save();
  if (!data) res.status(401).send("Error");
  else {
    // console.log(data);
    res.status(200).send("Success");
  }
});

module.exports = router;
