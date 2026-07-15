<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { searchMovies } from '../services/api.js'

const route = useRoute()

const keyword = ref(route.query.q || '')
const results = ref([])

// If the URL's ?q= changes (for example, coming from the Home page),
// copy it into the search box.
watch(
  () => route.query.q,
  (newWord) => {
    keyword.value = newWord || ''
  }
)

// Whenever the keyword changes, ask the backend for matching movies.
// { immediate: true } makes it also run once when the page first opens.
watch(
  keyword,
  async (word) => {
    if (word === '') {
      results.value = []
    } else {
      results.value = await searchMovies(word)
    }
  },
  { immediate: true }
)

function highlight(title) {
  if (keyword.value === '') return title
  return title.replace(new RegExp('(' + keyword.value + ')', 'gi'), '<mark>$1</mark>')
}
</script>

<template>
  <div>
    <h2>Search</h2>
    <input v-model="keyword" placeholder="type a movie title" />

    <p v-if="keyword === ''">Type something to search.</p>
    <p v-else-if="results.length === 0">No movies found.</p>
    <ul v-else>
      <li v-for="movie in results" :key="movie.id">
        <RouterLink :to="'/movie/' + movie.id">
          <span v-html="highlight(movie.title)"></span>
        </RouterLink>
        ({{ movie.year }})
      </li>
    </ul>
  </div>
</template>
