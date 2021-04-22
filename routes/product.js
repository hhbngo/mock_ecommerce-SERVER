const express = require('express');
const router = express.Router();

const { authCheck, adminCheck } = require('../middleware/auth');
const { createProduct, readProducts, readProductById, readProductBySlug, featureProduct, deleteProduct, editProduct } = require('../controllers/product');

router.get('/products/:category', readProducts);
router.get('/product/:id', readProductById);
router.get('/view/:slug', readProductBySlug);
router.post('/product-create', authCheck, adminCheck, createProduct);
router.patch('/product-feature/:id', authCheck, adminCheck, featureProduct);
router.patch('/product-edit/:id', authCheck, adminCheck, editProduct);
router.delete('/product-delete/:id', authCheck, adminCheck, deleteProduct);

module.exports = router;