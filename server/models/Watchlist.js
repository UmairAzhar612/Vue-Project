import mongoose from 'mongoose'

// Each document in this collection is one movie the user saved to their watchlist.
// We only store a reference (the movie's numeric id) instead of copying the whole
// movie, so the data is never duplicated. The real movie details live in the
// "movies" collection and are looked up when the watchlist is requested.
const watchlistSchema = new mongoose.Schema({
  movieId: { type: Number, required: true, unique: true },
  addedAt: { type: Date, default: Date.now },
})

export const Watchlist = mongoose.model('Watchlist', watchlistSchema)
