const express = require('express');
const router = express.Router();

router.post('/process', async (req, res) => {
    try {
        const { cardNumber, cardName, expiryDate, cvv, amount } = req.body;

        if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
            return res.status(400).json({ message: 'Invalid card number' });
        }

        if (!/^\d{3,4}$/.test(cvv)) {
            return res.status(400).json({ message: 'Invalid CVV' });
        }

        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            return res.status(400).json({ message: 'Invalid expiry date format (use MM/YY)' });
        }

        const [month, year] = expiryDate.split('/');
        const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
        if (expiry < new Date()) {
            return res.status(400).json({ message: 'Card has expired' });
        }

        const paymentSuccess = Math.random() > 0.02;
        if (!paymentSuccess) {
            return res.status(400).json({ message: 'Payment processing failed. Please try again.' });
        }

        const transactionId = 'TXN' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();

        res.json({
            transactionId,
            amount,
            timestamp: new Date()
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Bad Request" });
    }
});

module.exports = router;