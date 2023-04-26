const express = require("express");
const router = express.Router();

//Mongoose
const mongoose = require("mongoose");
const Product = require("./product");

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
router.post("/addproduct", async (req, res) => {
  const product = new Product({
    pname: req.body.pname,
    pquantity: req.body.pquantity,
    pprice: req.body.pprice,
  });
  console.log(product);

  const data = await product.save();

  if (data) {
    // console.log(data);
    res.status(200).send("Success");
  } else {
    res.status(500).send("Error");
  }
});

router.patch("/editproduct", async (req, res) => {
  const data = await Product.findOneAndUpdate(
    { _id: req.body._id },
    {
      $set: {
        pname: req.body.pname,
        pquantity: req.body.pquantity,
        pprice: req.body.pprice,
      },
    }
  );

  if (data) {
    res.status(200).send("Success");
  } else {
    res.status(500).send("Error");
  }
});

router.delete("/deleteproduct/:_id", async (req, res) => {
  const data = await Product.findByIdAndRemove(req.params._id);
  if (data) {
    res.status(200).send("Success");
  } else {
    res.status(500).send("Error");
  }
});

router.get("/getproducts", async (req, res) => {
  const data = await Product.find();

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(500).send("Error");
  }
});

module.exports = router;
