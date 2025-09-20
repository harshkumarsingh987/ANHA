import express from "express";
import Product from "../models/Product.js"; 
import { getAllProducts, createProduct } from "../controllers/product.js";

const router = express.Router();

// Existing routes
router.get("/", getAllProducts);
router.post("/", createProduct);
router.post("/filter", async (req, res) => {
  console.log(" Filter Request Body:", req.body); // ✅ Make sure this line is closed properly

  const { brand, category, priceRange } = req.body;

  const query = {};

  if (brand && brand.trim() !== "") {
    query.brand = brand;
  }

  if (category && category.trim() !== "") {
    query.category = category;
  }

  if (priceRange && priceRange.length === 2) {
    query.price = { $gte: priceRange[0], $lte: priceRange[1] };
  }

  try {
    const filteredProducts = await Product.find(query);
    console.log(" Filtered Products:", filteredProducts.length);
    res.status(200).json(filteredProducts); // ✅ Make sure this is complete
  } catch (error) {
    console.error("Filter Error:", error); // ✅ No typo or missing parenthesis
    res.status(500).json({ error: "Something went wrong while filtering products" }); // ✅ Closed properly
  }
});


export default router;
