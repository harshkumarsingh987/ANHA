import Product from "../models/Product.js";

// @desc Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, image, price, brand, rating, popularity, category, color } = req.body;

    if (!name || !image || !price || !brand || !rating || !category || !color) {
      return res.status(400).json({ error: "Please provide all required fields." });
    }

    const newProduct = new Product({
      name,
      image,
      price,
      brand,
      rating,
      popularity: popularity || 0,
      category,
      color,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
};

// @desc Get all products with optional filters and sorting
export const getAllProducts = async (req, res) => {
  try {
    const  { category, brand, color, rating, minPrice, maxPrice, sortBy} = req.query;

      let filter = {};
    
    // Category filter
    if (category && category !== "All") {
      filter.category = category;
    }
    
    // Brand filter using case-insensitive regex
    if (brand && brand !== "All") {
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
filter.brand = { $regex: new RegExp(escapeRegex(brand), "i") };
    }
    
       // Color filter
    if (color) {
      filter.color = color;
    }
      // Rating filter
    if (rating) {
      filter.rating = { $gte: Number(rating) };
    }

    // Price filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let sortOption = {};
    if (sortBy === "latest") sortOption.createdAt = -1;
    else if (sortBy === "priceLowToHigh") sortOption.price = 1;
    else if (sortBy === "priceHighToLow") sortOption.price = -1;
    else if (sortBy === "popularity") sortOption.popularity = -1;

    const products = await Product.find(filter).sort(sortOption);
      // Logs for debugging (optional)
    console.log("Filter Query:", req.query);
    console.log("Final MongoDB Filter:", filter);
    console.log("Filtered Products Count:", products.length);
    res.status(200).json({ products });
  } catch (error) {
    console.error("Product fetch error:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};