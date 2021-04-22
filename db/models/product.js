const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        lowercase: true,
        text: true,
        unique: true,
    },
    category: {
        type: String,
        enum: ['t-shirts', 'sweaters', 'outerwear', 'hats', 'jewelry', 'accessories']
    },
    description: String,
    imgLink: String,
    price: Number,
    quantity: Number, 
    featured: {
        type: Boolean,
        default: false
    },
    reviews: {
        type: Array,
        default: []
    }
});


module.exports = mongoose.model('Product', productSchema);