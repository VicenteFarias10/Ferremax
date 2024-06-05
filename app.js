const express = require('express');
const mongoose = require('mongoose');
const productRouter = require('./routes/products');
const cors = require('cors');
const cartRouter = require('./routes/cart');
const paymentRouter = require('./routes/payment'); 
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Importar el modelo Product
const Product = require('./models/Product');

const user = 'vi.fariasr@duocuc.cl';
const pass = 'Testing123';
const serieCLPUSD = 'F073.TCO.PRE.Z.D';

app.use(express.static('public'));
mongoose.connect('mongodb+srv://vichofarias:vichofariasJalvarez2001@cluster0.hwyszzq.mongodb.net/ferremas_db?retryWrites=true&w=majority');
app.use(cors());
app.use(express.json());

// Ruta para obtener productos con precios en CLP y USD
app.get('/api/products', async (req, res) => {
    try {
        const apiUrl = `https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx?user=${user}&pass=${pass}&timeseries=${serieCLPUSD}&function=GetSeries`;
        const response = await axios.get(apiUrl);
        const tasaConversion = parseFloat(response.data.Series.Obs[response.data.Series.Obs.length - 1].value);

        const products = await Product.find();
        const productsWithPrices = products.map(product => {
            const priceCLP = product.producto.precio[0].valor;
            const priceUSD = (priceCLP / tasaConversion).toFixed(2);
            return {
                ...product.toObject(),
                priceCLP,
                priceUSD
            };
        });

        res.status(200).json(productsWithPrices);
    } catch (error) {
        console.error('Error al obtener los productos o la tasa de cambio:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para Productos
app.use('/api', productRouter);
// Ruta para Carrito de compras
app.use('/api/cart', cartRouter);
// Montar las rutas de pago en la app(transbank)
app.use('/payment', paymentRouter);

// Manejador de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error interno del servidor');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
