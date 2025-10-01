import Product from '../models/Product.js';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load products data
let productsData;

try {
  const productsPath = join(__dirname, '../data/products.json');
  productsData = JSON.parse(await readFile(productsPath, 'utf8'));
} catch (error) {
  console.error('Error loading products data:', error);
  productsData = [];
}

// Get all products
const getProducts = async (req, res) => {
  try {
    const { category, brand, minPrice, maxPrice, rating, delivery } = req.query;
    
    let filter = {};
    
    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (rating) filter.rating = { $gte: parseFloat(rating) };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    if (delivery) filter.deliveryOptions = delivery;

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get unique categories and brands
const getFilters = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    const brands = await Product.distinct('brand');
    
    res.json({
      categories,
      brands
    });
  } catch (error) {
    console.error('Error fetching filters:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Seed initial products
const seedProducts = async () => {
  try {
    const productsCount = await Product.countDocuments();
    if (productsCount === 0) {
      await Product.insertMany(productsData);
      console.log('✅ Initial products seeded successfully');
    } else {
      console.log('✅ Products already exist in database');
    }
  } catch (error) {
    console.error('❌ Error seeding products:', error);
  }
};

export {
  getProducts,
  getFilters,
  seedProducts
};