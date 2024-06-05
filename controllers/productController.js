const axios = require('axios');
const Product = require('../models/Product');

const user = 'vi.fariasr@duocuc.cl';
const pass = 'Testing123';
const serieCLPUSD = 'F073.TCO.PRE.Z.D';

exports.getAllProducts = async (req, res) => {
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
};
