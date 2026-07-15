import { defineStore } from 'pinia'
import {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  clearWatchlist,
} from '../services/api.js'

// The watchlist now lives in the MongoDB database (through the backend),
// instead of the browser's localStorage. Each action calls the API and
// then updates the local list so the screen stays in sync.
export const useWatchlistStore = defineStore('watchlist', {
  state: () => {
    return {
      movies: [],
    }
  },
  getters: {
    count(state) {
      return state.movies.length
    },
  },
  actions: {
    // Load the saved movies from the backend. Called once when the app starts.
    async load() {
      this.movies = await getWatchlist()
    },
    // Is this movie already in the watchlist?
    isSaved(id) {
      return this.movies.some((m) => m.id === id)
    },
    // Add a movie: tell the backend, then add it to our local list.
    async add(movie) {
      await addToWatchlist(movie.id)
      this.movies.push(movie)
    },
    // Remove a movie: tell the backend, then remove it from our local list.
    async remove(id) {
      await removeFromWatchlist(id)
      this.movies = this.movies.filter((m) => m.id !== id)
    },
    // Add if it's not saved, remove if it is.
    async toggle(movie) {
      if (this.isSaved(movie.id)) {
        await this.remove(movie.id)
      } else {
        await this.add(movie)
      }
    },
    // Clear the whole watchlist.
    async clear() {
      await clearWatchlist()
      this.movies = []
    },
  },
})
