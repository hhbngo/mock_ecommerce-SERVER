const express = require('express');
const router = express.Router();

const { authCheck, adminCheck } = require('../middleware/auth');
const { getUserOrders, allOrders, updateStatus } = require('../controllers/order');

router.get('/user/orders', authCheck, getUserOrders);
router.get('/admin/orders', authCheck, adminCheck, allOrders);
router.patch('/order/status', authCheck, adminCheck, updateStatus);

module.exports = router;