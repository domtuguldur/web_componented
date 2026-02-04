const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

router.get("/", async (req, res) => {
    try {
        const {
            search,
            genre,
            year,
            minRating,
            maxRating,
            limit = 50,
            sort = "newest"
        } = req.query;
        const filter = {};

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ];
        }
        if (genre) {
            filter.genre = genre;
        }
        if (year) {
            filter.year = parseInt(year);
        }
        if (minRating) {
            filter.rating = { $gte: parseFloat(minRating) };
        }
        if (maxRating) {
            filter.rating = filter.rating || {};
            filter.rating.$lte = parseFloat(maxRating);
        }
        const sortMap = {
            newest: { createdAt: -1 },
            oldest: { createdAt: 1 },
            highestRated: { rating: -1 },
            lowestRated: { rating: 1 },
            year: { year: -1 },
            price_lowToHigh: { price: 1 },
            price_highToLow: { price: -1 },
            score: { score: -1 }
        };
        const movies = await Movie.find(filter)
            .sort(sortMap[sort] || sortMap.newest)
            .limit(parseInt(limit));
        res.json(movies);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }}
);

router.post("/", async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json(movie);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Bad Request" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Bad Request" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.json({ message: "Movie deleted" });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Bad Request" });
    }
});

module.exports = router;