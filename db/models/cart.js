const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    products: [
        {
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: Number
        }
    ], 
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

module.exports = mongoose.model('Cart', cartSchema);