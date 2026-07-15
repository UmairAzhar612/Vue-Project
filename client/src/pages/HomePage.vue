<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import MovieCard from '../components/MovieCard.vue'
import { getMovies, getGenres } from '../services/api.js'
import { useWatchlistStore } from '../stores/watchlist.js'

const router = useRouter()
const watchlist = useWatchlistStore()

const searchText = ref('')
const selectedGenre = ref('All')
const searchBox = ref(null)

// The movies and genres now come from the backend instead of a local file.
const movies = ref([])
const allGenres = ref([])

// Ask the backend for the movies (filtered by the chosen genre).
async function loadMovies() {
  movies.value = await getMovies(selectedGenre.value)
}

onMounted(async () => {
  searchBox.value.focus()
  allGenres.value = await getGenres()
  await loadMovies()
})

// Whenever the genre changes, ask the backend again.
watch(selectedGenre, loadMovies)

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

    <div v-for="movie in movies" :key="movie.id">
      <MovieCard
        :movie="movie"
        :is-saved="watchlist.isSaved(movie.id)"
        @toggle="watchlist.toggle($event)"
      />
    </div>
  </div>
</template>
