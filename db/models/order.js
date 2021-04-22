const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [
        {
            title: String,
            imgLink: String,
            price: Number,
            quantity: Number
        }
    ], 
    total: Number,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['Processing', 'Preparing', 'Shipped', 'Delivered']
    }
}, {timestamps: true});

module.exports = mongoose.model('Order', orderSchema);