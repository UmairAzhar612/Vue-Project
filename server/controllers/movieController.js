import { Movie } from '../models/Movie.js'

// GET /api/movies
// Returns all movies. Also supports two optional filters used by the frontend:
//   ?genre=Action   -> only movies in that genre (used by the Home page dropdown)
//   ?search=matrix  -> only movies whose title contains that text (used by Search)
export async function getMovies(req, res) {
  try {
    const { genre, search } = req.query
    const filter = {}

    if (genre && genre !== 'All') {
      filter.genres = genre // matches any movie whose genres array contains this value
    }
    if (search) {
      filter.title = { $regex: search, $options: 'i' } // 'i' = case-insensitive
    }

    const movies = await Movie.find(filter).sort({ id: 1 })
    res.json(movies)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movies', error: error.message })
  }
}

// GET /api/movies/:id
// Returns a single movie by its numeric id (used by the Movie Details page).
export async function getMovieById(req, res) {
  try {
    const movie = await Movie.findOne({ id: Number(req.params.id) })
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' })
    }
    res.json(movie)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movie', error: error.message })
  }
}

// GET /api/genres
// Returns a sorted list of every genre that appears across all movies
// (used to build the genre dropdown on the Home page).
export async function getGenres(req, res) {
  try {
    const genres = await Movie.distinct('genres')
    res.json(genres.sort())
  } catch (error) {
    res.status(500).json({ message: 'Error fetching genres', error: error.message })
  }
}
