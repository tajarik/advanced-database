const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, index: true }, // Indexed for faster searches
    password: { type: String, required: true },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] // Relationship with Order
});

module.exports = mongoose.model('User', userSchema);
