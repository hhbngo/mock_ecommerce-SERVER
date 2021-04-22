const Cart = require('../db/models/cart');
const User = require('../db/models/user');
const Order = require('../db/models/order');
const { CLIENT_DOMAIN, STRIPE_SECRET_KEY } = process.env;
const stripe = require('stripe')(STRIPE_SECRET_KEY);

const parseCartForStripe = async (user) => {
    const { _id } = await User.findOne({email: user.email});
    const cart = await Cart.findOne({postedBy: _id}).populate('products.itemId');

    return cart.products.map(el => {
        let { title, price, imgLink } = el.itemId;
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: title,
                    images: [imgLink]
                },
                unit_amount: price * 100
            },
            quantity: el.quantity
        };
    });
};

exports.createStripeSession = async(req, res) => {
    try {
        const cart = await parseCartForStripe(req.user);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: cart,
            mode: 'payment',
            success_url: `${CLIENT_DOMAIN}/order/success/{CHECKOUT_SESSION_ID}`,
            cancel_url:  `${CLIENT_DOMAIN}`
        })
    
        res.json({id: session.id}); 
    } catch (err) {
        res.status(400).send('Stripe / user error.');
    }
};

exports.stripeOrderSuccess = async (req, res) => {
    try {
        const { _id } = await User.findOne({email: req.user.email});
        const cart = await Cart.findOne({postedBy: _id}).populate('products.itemId');
    
        if (cart.products.length) {
            const modProducts = cart.products.map(el => {
                const { title, price, imgLink } = el.itemId;
                return {
                    title, price, imgLink, quantity: el.quantity
                }
            });
        
            const cartTotal =  modProducts.reduce((a, b) => a + b.price*b.quantity, 0);
            
            await new Order({
                products: modProducts,
                total: cartTotal,
                postedBy: _id,
                status: 'Processing'
            }).save();
        
            await Cart.findByIdAndUpdate(cart._id, { $set: {products: []}}).exec();
        }
        

        // const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
        // const customer = await stripe.customers.retrieve(session.customer);
        // res.json(customer);        

        res.json({});
    } catch (err) {
        res.status(400).send('Order complete error.')
    }
};