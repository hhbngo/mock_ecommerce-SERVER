const Product = require('../db/models/product');
const slugify = require('slugify');

exports.createProduct = async (req, res) => {
    req.body.slug = slugify(req.body.title);
    try {
        const newProduct = await new Product(req.body).save();
        res.json(newProduct);
    } catch (err) {
        console.log(err);
        res.status(400).send('Product Create failed');
    }
};

exports.readProducts = async (req, res) => {
    const { category } = req.params; 
    if (category === 'featured') {
        const products = await Product.find({featured: true});
        return res.json(products);
    }
    const products = await Product.find({category});
    res.json(products);
};

exports.readProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        res.json(product);
    } catch (err) {
        res.status(400).send('Product could not be fetched!');
    }
};

exports.readProductBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const product = await Product.findOne({slug});
        res.json(product);
    } catch (err) {
        res.status(400).send('Product could not be fetched!');
    }
};

exports.editProduct = async (req, res) => {
    try {
        if (req.body.title) req.body.slug = slugify(req.body.title);
        const newProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(newProduct);
    } catch (err) {
        res.status(400).send('Could not update product!'); 
    }
};

exports.featureProduct = async (req, res) => {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, {featured: req.body.value}, {new: true});
    res.json(updated);
}; 

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Product.findByIdAndDelete(id);
        res.json(deleted);
    } catch (err) {
        res.status(400).send('Product delete failed');
    }
};