const express = require("express");
const Admin = require("../models/admin");
const Product = require("../models/product");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Multer setup
const uploadsDir = path.join(__dirname, "..", "..", "public", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage });

// Admin login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username, password });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Add product with image upload
router.post("/add-product", upload.single("image"), async (req, res) => {
  const { name, category, price, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : "";

  try {
    const product = new Product({
      name,
      category,
      price,
      description,
      image,
    });
    await product.save();
    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Delete product by category and name
router.delete("/delete-product", async (req, res) => {
  const { category, name } = req.body;

  try {
    const product = await Product.findOneAndDelete({ category, name });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // remove image from filesystem if exists
    if (product.image) {
      const imagePath = path.join(__dirname, "..", "..", "public", product.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get products by category
router.get("/products", async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const products = await Product.find(query).sort({ name: 1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
