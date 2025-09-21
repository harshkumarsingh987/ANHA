import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";
import connectDB from "../config/db.js";

dotenv.config();
connectDB();

const generateDummyProducts = () => {
  const categories = ['All', 'Clothing', 'Footwear', 'Watches', 'Skincares'];
  const brands = ['ANHA', 'Nike', 'Adidas', 'Puma', "Levi's", 'H&M', 'Zara'];
  const colors = ['#000000', '#ffffff', '#ff0000', '#0000ff', '#008000', '#808080'];
  const themes = ['Light', 'Dark', 'Black & Gold', 'Denim'];

  const products = Array.from({ length: 500 }, (_, i) => {
    const brand = brands[Math.floor(Math.random() * brands.length)];
    return {
      name: `Product ${i + 1}`,
      brand: brand,
      category: categories[Math.floor(Math.random() * categories.length)],
      price: Math.floor(Math.random() * 5000) + 100,
      rating: Math.floor(Math.random() * 5) + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      inStock: Math.random() < 0.8,
      description: "A high-quality product made with care.",
      image: `https://source.unsplash.com/200x200/?${brand}`, // brand-based image
    };
  });

  return products;
};

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(generateDummyProducts());
    console.log("✅ 500 Dummy products inserted with brand-based images!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding products:", err.message);
    process.exit(1);
  }
};

seedProducts();
