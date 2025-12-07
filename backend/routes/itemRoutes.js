const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// GET all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create item
router.post('/', async (req, res) => {
    const item = new Item({
        id: req.body.id || Date.now().toString(), // Use provided ID or generate one
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        image: req.body.image
    });

    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update item
router.put('/:id', async (req, res) => {
    try {
        // Find by custom 'id' field, not _id
        const item = await Item.findOne({ id: req.params.id });
        if (!item) return res.status(404).json({ message: 'Item not found' });

        if (req.body.name) item.name = req.body.name;
        if (req.body.price) item.price = req.body.price;
        if (req.body.category) item.category = req.body.category;
        if (req.body.description) item.description = req.body.description;
        if (req.body.image) item.image = req.body.image;

        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE delete item
router.delete('/:id', async (req, res) => {
    try {
        const result = await Item.deleteOne({ id: req.params.id });
        if (result.deletedCount === 0) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
