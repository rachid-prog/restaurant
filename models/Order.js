const mongoose = require('mongoose')
const Counter = require('./Counter')

const orderSchema = new mongoose.Schema({
   orderNumber: { type: Number, unique: true },
   items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Produit' }],
   status: { type: String, enum: ['en_attente', 'en_attente', 'prête'], default: 'en_attente' },
   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   createdAt: { type: Date, default: Date.now }
})

orderSchema.pre('save', async function (next) {
    if (this.isNew) {
        const counter = await Counter.findOneAndUpdate(
            { name: 'orderNumber' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this.orderNumber = counter.seq;
    }
    next();
});

module.exports = mongoose.model('Order', orderSchema)