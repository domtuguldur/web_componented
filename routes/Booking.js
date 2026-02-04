const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Movie = require('../models/Movie');
const User = require('../models/user');

router.post('/', async (req, res) => {
    try {
        const { userId, movieId, showtime, seats, totalPrice } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        const booking = await Booking.create({
            userId,
            movieId,
            showtime,
            seats,
            totalPrice,
            paymentStatus: 'completed',
            bookingStatus: 'confirmed'
        });

        const populatedBooking = await Booking.findById(booking._id)
            .populate('movieId', 'title image')
            .populate('userId', 'name email');

        res.status(201).json(populatedBooking);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Bad Request" });
    }
});

router.get('/user/:userId', async (req, res) => {
    try {
        const bookings = await Booking.find({ 
            userId: req.params.userId,
            bookingStatus: 'confirmed'
        })
        .populate('movieId', 'title image duration genre')
        .sort({ createdAt: -1 });

        res.json(bookings);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Bad Request" });
    }
});

router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('movieId', 'title image')
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });

        res.json(bookings);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Bad Request" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (booking.bookingStatus === 'cancelled') {
            return res.status(400).json({ message: 'Booking already cancelled' });
        }

        booking.bookingStatus = 'cancelled';
        booking.paymentStatus = 'refunded';
        await booking.save();

        res.json({ message: 'Booking cancelled successfully' });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Bad Request" });
    }
});

module.exports = router;