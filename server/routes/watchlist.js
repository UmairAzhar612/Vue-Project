import express from 'express'
import {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  clearWatchlist,
} from '../controllers/watchlistController.js'

// These routes are mounted under "/api/watchlist" in server.js.
const router = express.Router()

router.get('/', getWatchlist) //               GET    /api/watchlist
router.post('/', addToWatchlist) //            POST   /api/watchlist
router.delete('/', clearWatchlist) //          DELETE /api/watchlist
router.delete('/:movieId', removeFromWatchlist) // DELETE /api/watchlist/1

export default router
