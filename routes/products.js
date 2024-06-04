const express = require('express');
const router = express.Router();
const Product = require('../models/Product');




// Endpoint para consultar todos los productos
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        console.log('Productos enviados:', products); // Verifica los productos enviados
        products.forEach(product => {
            console.log(`Producto ID: ${product._id}`); // Verifica cada producto individualmente
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// endpoint para consultar producto por ID
router.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Converir id
        const productId = parseInt(id);
        
        // fund by id
        const product = await Product.findOne({ _id: productId });
        
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Endpoint para actualizar
router.post('/products', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Endpoint para actualizar un producto
router.patch('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { producto } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, { producto }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Endpoint para borrar
router.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        res.json(deletedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});





module.exports = router;
