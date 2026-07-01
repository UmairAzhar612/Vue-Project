<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MovieCard from '../components/MovieCard.vue'
import { movies, allGenres } from '../data/movies.js'
import { useWatchlistStore } from '../stores/watchlist.js'

const router = useRouter()
const watchlist = useWatchlistStore()

const searchText = ref('')
const selectedGenre = ref('All')
const searchBox = ref(null)

onMounted(() => {
  searchBox.value.focus()
})

const filteredMovies = computed(() => {
  if (selectedGenre.value === 'All') {
    return movies
  }
  return movies.filter((m) => m.genres.includes(selectedGenre.value))
})

function goToSearch() {
  if (searchText.value !== '') {
    router.push('/search?q=' + searchText.value)
  }
}
</script>

<template>
  <div>
    <h2>Home</h2>

    <input ref="searchBox" v-model="searchText" placeholder="search a movie" />
    <button @click="goToSearch">Search</button>

    <p>
      Genre:
      <select v-model="selectedGenre">
        <option value="All">All</option>
        <option v-for="genre in allGenres" :key="genre" :value="genre">
          {{ genre }}
        </option>
      </select>
    </p>

    <div v-for="movie in filteredMovies" :key="movie.id">
      <MovieCard
        :movie="movie"
        :is-saved="watchlist.isSaved(movie.id)"
        @toggle="watchlist.toggle($event)"
      />
    </div>
  </div>
</template>
