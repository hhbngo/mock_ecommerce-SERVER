const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    role: {
        type: String,
        default: 'subscriber'
    }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);