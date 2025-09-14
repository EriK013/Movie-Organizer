const axios = require("axios");
const Movies = require("../models/Movie");


exports.renderSearchPage = (req, res) => {
    res.render("index", { movies: null, error: null });
};

exports.searchMovies = async (req, res) => {
    const query = req.body.query;
    const apiKey = process.env.OMDB_API_KEY;
    const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;
    try {
        const response = await axios.get(url);
        console.log("API Response:", response.data);
        if (response.data.Response === "True") {
            res.render("index", { movies: response.data.Search, error: null });
        } else {
            res.render("index", { movies: null, error: response.data.Error });
        }
    } catch (error) {
        res.render("index", { movies: null, error: "Something went wrong!" });
    }
};

const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "You need to log in first." });
    }
    next();
};

exports.addToMovielist = async (req, res) => {
    try {
        const { title, year, poster, status } = req.body;
        const userId = req.session.user._id;

        const existingMovie = await Movies.findOne({ user: userId, title });
        if (existingMovie) {
            return res.status(400).json({ message: "Movie already in list" });
        }

        const newWatchlistItem = new Movies({ user: userId, title, year, poster, status });
        await newWatchlistItem.save();

        res.json({ message: "Movie added to list successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.removeFromMovielist = async (req, res) => {
    try {
        const { movieId } = req.body;
        const userId = req.session.user._id;

        await Movies.findOneAndDelete({ _id: movieId, user: userId });
        res.json({ success: true, message: "Movie removed from watchlist" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error removing movie" });
    }
};

exports.markAsWatched = async (req, res) => {
    try {
        const { movieId } = req.body;
        const userId = req.session.user._id;

        const movie = await Movies.findOne({ _id: movieId, user: userId, status: "watchlist" });
        if (!movie) {
            return res.status(404).json({ success: false, message: "Movie not found in watchlist" });
        }

        movie.status = "watched";
        await movie.save();

        res.json({ success: true, message: "Movie moved to watched history!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error moving movie to watched history" });
    }
};

exports.getWatchlist = async (req, res) => {
    try {
        const userId = req.session.user._id;
        const watchlistMovies = await Movies.find({ user: userId, status: "watchlist" });

        res.render("userViews/watchlist", { user: req.session.user, watchlistMovies });
    } catch (error) {
        res.status(500).send("Error fetching watchlist");
    }
};

exports.getWatchedMovies = async (req, res) => {
    try {
        const userId = req.session.user._id;
        const watchedMovies = await Movies.find({ user: userId, status: "watched" });

        res.render("userViews/watched", { user: req.session.user, watchedMovies });
    } catch (error) {
        res.status(500).send("Error fetching watched movies");
    }
};

exports.isAuthenticated = isAuthenticated;


