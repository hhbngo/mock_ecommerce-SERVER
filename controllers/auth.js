const User = require('../db/models/user');
const Cart = require('../db/models/cart');

exports.createUser = async (req, res) => {
    try {
        const { email } = req.user;
        const newUser = await new User({email}).save();
        await new Cart({
            products: [],
            postedBy: newUser._id
        }).save();
        res.json(newUser);
    } catch (err) {
        res.status(400).send('Unable to create user!');
    }
};

exports.currentUser = async (req, res) => {
    User.findOne({email: req.user.email}).exec((err, user) => {
        if (err) throw new Error(err);
        res.json(user);
    });
}
