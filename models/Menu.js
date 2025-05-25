const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: String,
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Produit' }],
});

module.exports = mongoose.model('Menu', menuSchema);