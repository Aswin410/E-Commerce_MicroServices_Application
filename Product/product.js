const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  pname: {
    type: String,
    required: true,
  },
  pquantity: {
    type: Number,
    required: true,
  },
  pprice: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
