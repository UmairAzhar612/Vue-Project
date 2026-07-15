<script setup>
import MovieCard from '../components/MovieCard.vue'
import { useWatchlistStore } from '../stores/watchlist.js'

const watchlist = useWatchlistStore()
</script>

<template>
  <div>
    <h2>My Watchlist ({{ watchlist.count }})</h2>
    <button v-if="watchlist.count > 0" @click="watchlist.clear()">Clear all</button>

    <p v-if="watchlist.count === 0">Your watchlist is empty.</p>
    <div v-else>
      <div v-for="movie in watchlist.movies" :key="movie.id">
        <MovieCard
          :movie="movie"
          :is-saved="watchlist.isSaved(movie.id)"
          @toggle="watchlist.toggle($event)"
        />
      </div>
    </div>
  </div>
</template>
