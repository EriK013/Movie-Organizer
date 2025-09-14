const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

// Middleware
const { isAuthenticated } = movieController;

router.get("/", movieController.renderSearchPage);
router.post("/search", movieController.searchMovies);

router.post("/movieList/add", isAuthenticated, movieController.addToMovielist);
router.post("/movieList/remove", isAuthenticated, movieController.removeFromMovielist);
router.post("/movieList/watched", isAuthenticated, movieController.markAsWatched);

router.get("/watchlist", isAuthenticated, movieController.getWatchlist);
router.get("/watched", isAuthenticated, movieController.getWatchedMovies);

module.exports = router;