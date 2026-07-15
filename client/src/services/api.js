import axios from 'axios'

// This is the one place that knows where the backend lives.
// Every request in the app goes through this "api" object, so if the
// backend address ever changes, we only change it here.
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
})

// ---------- Movies ----------

// Get movies. If a genre is given (and it's not "All"), the backend
// only returns movies in that genre. Used by the Home page.
export async function getMovies(genre) {
  const res = await api.get('/movies', { params: { genre } })
  return res.data
}

// Search movies by title text. Used by the Search page.
export async function searchMovies(word) {
  const res = await api.get('/movies', { params: { search: word } })
  return res.data
}

// Get one movie by its id. Returns null if it doesn't exist.
export async function getMovieById(id) {
  try {
    const res = await api.get('/movies/' + id)
    return res.data
  } catch (error) {
    return null // movie not found
  }
}

// Get the list of all genres (for the dropdown on the Home page).
export async function getGenres() {
  const res = await api.get('/genres')
  return res.data
}

// ---------- Watchlist ----------

// Get the movies the user has saved.
export async function getWatchlist() {
  const res = await api.get('/watchlist')
  return res.data
}

// Save a movie to the watchlist.
export async function addToWatchlist(movieId) {
  await api.post('/watchlist', { movieId })
}

// Remove one movie from the watchlist.
export async function removeFromWatchlist(movieId) {
  await api.delete('/watchlist/' + movieId)
}

// Empty the whole watchlist.
export async function clearWatchlist() {
  await api.delete('/watchlist')
}
