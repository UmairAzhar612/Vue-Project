<script setup>
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { getMovieById } from '../data/movies.js'
import { useWatchlistStore } from '../stores/watchlist.js'

const route = useRoute()
const watchlist = useWatchlistStore()

const movie = computed(() => getMovieById(route.params.id))

watchEffect(() => {
  if (movie.value) {
    document.title = movie.value.title
  }
})
</script>

<template>
  <div v-if="movie">
    <h2>{{ movie.title }} ({{ movie.year }})</h2>
    <p>Rating: {{ movie.rating }}/10</p>
    <p>Runtime: {{ movie.runtime }}</p>
    <p>Director: {{ movie.director }}</p>

    <p>
      Genres:
      <span v-for="genre in movie.genres" :key="genre">{{ genre }} </span>
    </p>

    <p>{{ movie.overview }}</p>

    <h3>Cast</h3>
    <ul>
      <li v-for="actor in movie.cast" :key="actor">{{ actor }}</li>
    </ul>

    <button @click="watchlist.toggle(movie)">
      <span v-if="watchlist.isSaved(movie.id)">Remove from watchlist</span>
      <span v-else>Add to watchlist</span>
    </button>

    <p><RouterLink to="/">Back to home</RouterLink></p>
  </div>

  <div v-else>
    <p>Movie not found.</p>
    <RouterLink to="/">Back to home</RouterLink>
  </div>
</template>
