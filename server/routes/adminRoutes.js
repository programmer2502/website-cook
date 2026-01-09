const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized' });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') next();
    else res.status(403).json({ message: 'Admin only' });
};

// Get Monthly Sales Stats
router.get('/stats', protect, admin, async (req, res) => {
    try {
        const orders = await Order.find();
        // Simplified monthly calculation
        const currentMonth = new Date().getMonth();
        const monthlyOrders = orders.filter(o => new Date(o.createdAt).getMonth() === currentMonth);
        const totalSales = monthlyOrders.reduce((acc, curr) => acc + curr.totalAmount, 0);

        // Low stock items
        const lowStock = await Product.find({ stock: { $lt: 5 } });

        res.json({
            totalSales,
            orderCount: monthlyOrders.length,
            lowStockCount: lowStock.length,
            lowStockItems: lowStock
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
