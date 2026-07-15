import express from 'express'
import { getMovies, getMovieById } from '../controllers/movieController.js'

// These routes are mounted under "/api/movies" in server.js.
const router = express.Router()

router.get('/', getMovies) //        GET /api/movies
router.get('/:id', getMovieById) //  GET /api/movies/1

export default router
