import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import { Movie } from '../models/Movie.js'
import { movies } from '../data/movies.js'

// This script fills the "movies" collection with the starting list of movies.
// Run it once (or whenever you want to reset the movie list) with:  npm run seed
async function seed() {
  await connectDB()

  await Movie.deleteMany({}) // clear old movies first so we don't create duplicates
  await Movie.insertMany(movies) // insert all 12 movies

  console.log(`✅ Seeded ${movies.length} movies into the database`)

  await mongoose.connection.close()
  process.exit(0)
}

seed().catch((error) => {
  console.error('❌ Seeding failed:', error.message)
  process.exit(1)
})
