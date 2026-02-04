const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Booking = require('../models/booking');
const Movie = require('../models/Movie');

router.get('/stats', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalMovies = await Movie.countDocuments();
        const totalBookings = await Booking.countDocuments({ bookingStatus: 'confirmed' });

        const revenueData = await Booking.aggregate([
            { $match: { paymentStatus: 'completed', bookingStatus: 'confirmed' } },
            { $group: { _id: null, total: { $sum: '$totalPrice' } } }
        ]);
        const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;

        const recentBookings = await Booking.find({ bookingStatus: 'confirmed' })
            .populate('movieId', 'title')
            .populate('userId', 'name email')
            .sort({ createdAt: -1 })
            .limit(10);

        const popularMovies = await Booking.aggregate([
            { $match: { bookingStatus: 'confirmed' } },
            { $group: { _id: '$movieId', bookingCount: { $sum: 1 } } },
            { $sort: { bookingCount: -1 } },
            { $limit: 5 }
        ]);

        const movieIds = popularMovies.map(m => m._id);
        const movies = await Movie.find({ _id: { $in: movieIds } });
        const popularMoviesWithDetails = popularMovies.map(pm => {
            const movie = movies.find(m => m._id.toString() === pm._id.toString());
            return {
                movie: movie ? { _id: movie._id, title: movie.title, image: movie.image } : null,
                bookingCount: pm.bookingCount
            };
        });

        res.json({
            totalUsers,
            totalMovies,
            totalBookings,
            totalRevenue,
            recentBookings,
            popularMovies: popularMoviesWithDetails
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Bad Request" });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Bad Request" });
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role === 'admin') {
            return res.status(403).json({ message: 'Cannot delete admin users' });
        }

        await Booking.updateMany(
            { userId: req.params.id, bookingStatus: 'confirmed' },
            { bookingStatus: 'cancelled', paymentStatus: 'refunded' }
        );

        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Bad Request" });
    }
});

module.exports = router;