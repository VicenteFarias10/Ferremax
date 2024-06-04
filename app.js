const express = require('express');
const mongoose = require('mongoose');
const productRouter = require('./routes/products');
const cors = require('cors');
const cartRouter = require('./routes/cart');
const paymentRouter = require('./routes/payment'); 

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
mongoose.connect('mongodb+srv://vichofarias:vichofariasJalvarez2001@cluster0.hwyszzq.mongodb.net/ferremas_db?retryWrites=true&w=majority');
app.use(cors());
app.use(express.json()); // Middleware para analizar JSON en el cuerpo de la solicitud


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
