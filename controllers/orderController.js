const Order = require('../models/orderModel');

const createOrder = async (req, res) => {
    const order = new Order({ user: req.user.id, ...req.body });
    await order.save();
    res.status(201).json(order);
};

const getOrders = async (req, res) => {
    const orders = await Order.find().populate('user').populate('products.product');
    res.json(orders);
};

const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user').populate('products.product');
    res.json(order);
};

const updateOrderStatus = async (req, res) => {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(order);
};

module.exports = { createOrder, getOrders, getOrderById, updateOrderStatus };
