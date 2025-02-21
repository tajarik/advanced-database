const mongoose = require('mongoose');
const axios = require('axios');
const Product = require('../models/productModel'); 
const connectDB = require('../config/db'); 

const importProducts = async () => {
    try {
        await connectDB(); // Ensure DB connection works
        console.log('✅ MongoDB Connected Successfully');

        console.log('Fetching products from external API...');
        const { data } = await axios.get('https://fakestoreapi.com/products');

        if (!data || data.length === 0) {
            console.log('⚠️ No products found in API response.');
            process.exit(1);
        }

        // Transform data
        const products = data.map((item) => ({
            name: item.title,
            price: item.price,
            description: item.description,
            category: item.category,
            stock: Math.floor(Math.random() * 100), 
            reviews: [] 
        }));

        await Product.deleteMany(); // Clear old data
        await Product.insertMany(products); // Save new data
        console.log('✅ Data imported successfully!');
        process.exit();
    } catch (error) {
        console.error('❌ Error importing data:', error.message);
        process.exit(1);
    }
};

// Run script
importProducts();
