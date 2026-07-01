import { defineStore } from 'pinia'

const saved = localStorage.getItem('myWatchlist')

export const useWatchlistStore = defineStore('watchlist', {
  state: () => {
    return {
      movies: saved ? JSON.parse(saved) : [],
    }
  },
  getters: {
    count(state) {
      return state.movies.length
    },
  },
  actions: {
    isSaved(id) {
      return this.movies.some((m) => m.id === id)
    },
    add(movie) {
      this.movies.push(movie)
      localStorage.setItem('myWatchlist', JSON.stringify(this.movies))
    },
    remove(id) {
      this.movies = this.movies.filter((m) => m.id !== id)
      localStorage.setItem('myWatchlist', JSON.stringify(this.movies))
    },
    toggle(movie) {
      if (this.isSaved(movie.id)) {
        this.remove(movie.id)
      } else {
        this.add(movie)
      }
    },
    clear() {
      this.movies = []
      localStorage.setItem('myWatchlist', JSON.stringify(this.movies))
    },
  },
})
