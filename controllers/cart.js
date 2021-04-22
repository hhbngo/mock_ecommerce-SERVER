const Cart = require('../db/models/cart');
const User = require('../db/models/user');

exports.readUserCart = async(req, res) => {
    try {
        const {_id} = await User.findOne({email: req.user.email});
        const userCart = await Cart.findOne({postedBy: _id})
            .populate('products.itemId');
        res.json(userCart);
    } catch (err) {
        res.status(400).send('Unable to fetch user cart!');
    }
};

exports.add = async (req, res) => { 
    const { id: itemId, quantity } = req.body;
    const user = await User.findOne({email: req.user.email}).exec();
    const existingCart = await Cart.findOne({postedBy: user._id}).exec();    
    const existingItem = existingCart.products.find(el => el.itemId == itemId);

    if (existingItem) {
        try {
            const ct = await Cart.findOneAndUpdate(
                {"products._id": existingItem._id},
                { $set: 
                    { "products.$.quantity": existingItem.quantity + parseInt(quantity)}
                }
            ).exec();
            res.json(ct);
        } catch (err) {
            res.json(err);
        }
    } else {
        try {
            const ct = await Cart.findByIdAndUpdate(existingCart._id, 
                {
                    $push: { products: {itemId, quantity}}
                }
            ).exec();
            res.json(ct);
        } catch (err) {
            res.json(err);
        }
    }
};

exports.remove = async(req, res) => {
    const { id } = req.body;
    try {
        const {_id} = await User.findOne({email: req.user.email});
        const userCart = await Cart.findOne({postedBy: _id});
        let deleted = userCart.products.find(el => el.itemId == id);
        await Cart.findByIdAndUpdate(userCart._id,
            {
                $pull: { products: deleted}
            }
        ).exec();
        res.status(200).send('Success');    
    } catch (err) {
        res.status(400).send('Unable to delete item from cart');
    }
}