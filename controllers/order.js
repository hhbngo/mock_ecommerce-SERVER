const User = require('../db/models/user');
const Order = require('../db/models/order');

exports.getUserOrders = async (req, res) => {
    try {
        const user = await User.findOne({email: req.user.email});
        const order = await Order.find({postedBy: user._id});
        res.json(order);
    } catch (err) {
        res.status(400).send('Can not get orders!');
    }
};

exports.allOrders = async (req, res) => {
    try {
        const order = await Order.find({}).populate('postedBy', 'email');
        res.json(order);
    } catch (err) {
        res.status(400).send('Can not get all user orders!');
    }
};

exports.updateStatus = async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.body.id, {
            $set: {status: req.body.status}
        });
        res.status(200).send('');
    } catch (err) { 
        res.status(400).send('Could not update status!');
    }
};