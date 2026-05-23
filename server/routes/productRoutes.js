const express = require("express");
const router = express.Router();

const Product = require("../models/Product");


// GET PRODUCTS

router.get("/", async (req, res) => {

  const products = await Product.find();

  res.json(products);

});




// ADD PRODUCT

router.post("/", async (req, res) => {

  const newProduct = new Product(req.body);

  await newProduct.save();

  res.json(newProduct);

});




// DELETE PRODUCT

router.delete("/:id", async (req, res) => {

  await Product.findByIdAndDelete(req.params.id);

  res.json({ message: "Product Deleted" });

});



module.exports = router;