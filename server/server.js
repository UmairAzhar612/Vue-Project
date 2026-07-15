import 'dotenv/config' // loads the values from the .env file into process.env
import express from 'express'
import cors from 'cors'

import { connectDB } from './config/db.js'
import { getGenres } from './controllers/movieController.js'
import movieRoutes from './routes/movies.js'
import watchlistRoutes from './routes/watchlist.js'

const app = express()

// ---- Middleware (runs on every request) ----
app.use(cors()) // allows the Vue frontend (running on a different port) to call this API
app.use(express.json()) // lets the server read JSON data sent in the request body

// ---- Health-check route ----
// Visiting http://localhost:5000/ confirms the server is running.
app.get('/', (req, res) => {
  res.json({ message: 'MovieApp API is running 🎬' })
})

// ---- API routes ----
app.use('/api/movies', movieRoutes) // all movie endpoints
app.get('/api/genres', getGenres) //  list of genres for the dropdown
app.use('/api/watchlist', watchlistRoutes) // saved-movies endpoints

// ---- Start the server ----
// We connect to the database first, and only start listening once it succeeds.
const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`)
  })
})
