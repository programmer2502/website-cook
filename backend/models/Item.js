const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Keeping string ID for compatibility with frontend logic if needed, or we can migrate to _id
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String },
    image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
