const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const productRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
const paymentRouter = require('./routes/payment'); 
const productController = require('./controllers/productController');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

app.use(express.static('public'));
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
connectDB();

// Rutas de la API
app.get('/api/products', productController.getAllProducts);
app.use('/api', productRouter);
app.use('/api/cart', cartRouter);
app.use('/payment', paymentRouter);

// Manejador de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error interno del servidor');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
