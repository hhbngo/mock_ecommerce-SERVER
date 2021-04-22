const express = require('express');
const router = express.Router();

const { authCheck } = require('../middleware/auth');
const { readUserCart, add, remove } = require('../controllers/cart');

router.post('/cart/add', authCheck, add)
router.get('/cart/user', authCheck, readUserCart);
router.patch('/cart/remove', authCheck, remove);

module.exports = router;