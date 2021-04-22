const express = require('express');
const router = express.Router();

const { authCheck } = require('../middleware/auth');
const { createStripeSession, stripeOrderSuccess } = require('../controllers/stripe');

router.post('/stripe/create-checkout-session', authCheck, createStripeSession);
router.post('/stripe/order/success/:sessionId', authCheck, stripeOrderSuccess);

module.exports = router;