const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, index: true }, // Indexed for search optimization
    price: { type: Number, required: true },
    description: String,
    category: { type: String, required: true, index: true }, // Indexed for category-based queries
    stock: { type: Number, required: true },
    reviews: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User
            rating: { type: Number, min: 1, max: 5 },
            comment: String
        }
    ]
});

module.exports = mongoose.model('Product', productSchema);
