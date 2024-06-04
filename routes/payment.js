const express = require('express');
const router = express.Router();
const { WebpayPlus } = require('transbank-sdk');

// Endpoint para creacion de transaccion
router.post('/createTransaction', async (req, res) => {
    const { buyOrder, sessionId, amount, returnUrl } = req.body;
    try {
        const createResponse = await (new WebpayPlus.Transaction()).create(
            buyOrder,
            sessionId,
            amount,
            returnUrl
        );
        res.json(createResponse);
    } catch (error) {
        console.error('Error al crear la transacción:', error);
        res.status(500).json({ error: 'Error al crear la transacción' });
    }
});
// Endpoint para manejar la respuesta de webpay plus

router.post('/commit', (req, res) => {
    // Obtén los datos de la respuesta de Webpay Plus desde el cuerpo de la solicitud
    const { token_ws, tbk_token, tbk_orden_compra, tbk_id_sesion } = req.body;

    // Verifica si el pago fue aprobado
    if (token_ws && tbk_token && tbk_orden_compra && tbk_id_sesion) {
        // El pago fue aprobado
        res.send('¡Pago aprobado!');
    } else {
        // El pago fue rechazado
        res.send('¡Pago rechazado!');
    }
});

module.exports = router;
