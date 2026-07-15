import mongoose from 'mongoose'

// This schema describes the shape of a single movie document in the database.
// It matches the fields the Vue frontend already expects (see src/data/movies.js).
const movieSchema = new mongoose.Schema({
  // A simple numeric id (1, 2, 3...). The frontend uses it in URLs like /movie/1,
  // so we keep it instead of relying on MongoDB's long _id value.
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  year: { type: Number, required: true },
  rating: { type: Number, required: true },
  runtime: { type: String, required: true },
  genres: { type: [String], default: [] },
  director: { type: String, required: true },
  cast: { type: [String], default: [] },
  overview: { type: String, required: true },
})

export const Movie = mongoose.model('Movie', movieSchema)
