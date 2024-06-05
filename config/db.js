const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://vichofarias:vichofariasJalvarez2001@cluster0.hwyszzq.mongodb.net/ferremas_db?retryWrites=true&w=majority', {   
        });
        console.log('Conexión a la base de datos exitosa');
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
