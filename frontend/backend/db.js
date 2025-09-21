// db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URL || 'mongodb://localhost:27017/anha-ecommerce';

const brands = ['ANHA', 'Nike', 'Adidas', 'Levi’s', 'HRX'];
const categories = ['Clothing', 'Footwear', 'Watches', 'Accessories'];
const colors = ['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#808080'];

const generateRandomProduct = (i) => {
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return {
    name: `${brand} Product ${i + 1}`,
    image: `https://source.unsplash.com/200x200/?fashion,product,${i}`,
    price: Math.floor(Math.random() * 4000) + 500,
    brand,
    rating: (Math.random() * 2 + 3).toFixed(1),
    category,
    color,
  };
};

const seedProducts = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected');

    await Product.deleteMany({});
    console.log('🧹 Existing products deleted');

    const dummyProducts = Array.from({ length: 500 }, (_, i) => generateRandomProduct(i));
    await Product.insertMany(dummyProducts);

    console.log('✅ 500 dummy products inserted successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedProducts();
