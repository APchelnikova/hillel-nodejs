const Product = require('../models/productModel');

let productsCache = null;
let cacheTimestamp = 0;

const CACHE_TTL = 30 * 1000;

const clearProductsCache = () => {
    productsCache = null;
    cacheTimestamp = 0;
};

const getProducts = async (req, res) => {
    const now = Date.now();

    if (
        productsCache &&
        now - cacheTimestamp < CACHE_TTL
    ) {
        console.log('Products returned from cache');

        return res.json(productsCache);
    }

    const products = await Product.find();

    productsCache = products;
    cacheTimestamp = now;

    console.log('Products returned from database');

    return res.status(200).json(products);
};

const createProduct = async (req, res) => {
    const { name, price, category, stock } = req.body;
    const newProduct = new Product({ name, price, category, stock });
    await newProduct.save();

    clearProductsCache();

    res.status(201).json(newProduct);
};

const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json(product);
};

const updateProduct = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

    clearProductsCache();

    res.json(updatedProduct);
};

const deleteProduct = async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });

    clearProductsCache();

    res.json({ message: 'Product deleted' });
};

module.exports = {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
};
