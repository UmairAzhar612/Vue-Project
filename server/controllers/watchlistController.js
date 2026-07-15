import { Watchlist } from '../models/Watchlist.js'
import { Movie } from '../models/Movie.js'

// GET /api/watchlist
// Returns the full movie objects the user has saved. We look up each saved
// movieId in the "movies" collection so the frontend gets complete movie data.
export async function getWatchlist(req, res) {
  try {
    const entries = await Watchlist.find().sort({ addedAt: 1 })
    const ids = entries.map((entry) => entry.movieId)
    const movies = await Movie.find({ id: { $in: ids } })
    res.json(movies)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching watchlist', error: error.message })
  }
}

// POST /api/watchlist   body: { "movieId": 1 }
// Adds a movie to the watchlist. Duplicates are ignored.
export async function addToWatchlist(req, res) {
  try {
    const { movieId } = req.body
    if (movieId === undefined) {
      return res.status(400).json({ message: 'movieId is required' })
    }

    // Make sure the movie actually exists before saving it.
    const movie = await Movie.findOne({ id: Number(movieId) })
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    // Only add it if it isn't already in the watchlist.
    const alreadySaved = await Watchlist.findOne({ movieId: Number(movieId) })
    if (!alreadySaved) {
      await Watchlist.create({ movieId: Number(movieId) })
    }

    res.status(201).json({ message: 'Added to watchlist', movieId: Number(movieId) })
  } catch (error) {
    res.status(500).json({ message: 'Error adding to watchlist', error: error.message })
  }
}

// DELETE /api/watchlist/:movieId
// Removes one movie from the watchlist.
export async function removeFromWatchlist(req, res) {
  try {
    await Watchlist.deleteOne({ movieId: Number(req.params.movieId) })
    res.json({ message: 'Removed from watchlist', movieId: Number(req.params.movieId) })
  } catch (error) {
    res.status(500).json({ message: 'Error removing from watchlist', error: error.message })
  }
}

// DELETE /api/watchlist
// Clears the entire watchlist ("Clear all" button on the Watchlist page).
export async function clearWatchlist(req, res) {
  try {
    await Watchlist.deleteMany({})
    res.json({ message: 'Watchlist cleared' })
  } catch (error) {
    res.status(500).json({ message: 'Error clearing watchlist', error: error.message })
  }
}
