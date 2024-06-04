const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' // Referencia al modelo de productos
    },
    quantity: Number,
    productName: String,
    productPrice: Number
});


const cartSchema = new mongoose.Schema({
    userId: String,
    items: [cartItemSchema]
});

module.exports = mongoose.model('Cart', cartSchema)