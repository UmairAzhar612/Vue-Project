import mongoose from 'mongoose'

// Opens the connection to our MongoDB Atlas database.
// The connection string (MONGO_URI) is read from the .env file so we never
// hard-code the password inside the source code.
export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ Connected to MongoDB Atlas')
  } catch (error) {
    console.error('❌ Could not connect to MongoDB:', error.message)
    process.exit(1) // stop the app if the database is unreachable
  }
}
