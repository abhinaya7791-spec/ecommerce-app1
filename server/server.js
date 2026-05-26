require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("API Running");
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  image: String,
});

const Product = mongoose.model("Product", productSchema);

app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post("/api/products", async (req, res) => {
  const product = new Product(req.body);

  const savedProduct = await product.save();

  res.json(savedProduct);
});

app.delete("/api/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);

  res.json({
    message: "Product Deleted",
  });
});

app.post("/api/auth/login", (req, res) => {

  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {

    res.json({
      message: "Login Successful",
    });

  } else {

    res.status(401).json({
      message: "Invalid Credentials",
    });

  }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});