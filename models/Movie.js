const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    year: { type: String, required: true },
    poster: { type: String, required: true },
    status: { type: String, enum: ["watchlist", "watched"], default: "watchlist" }, // NEW FIELD
    addedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Movies", MovieSchema);
