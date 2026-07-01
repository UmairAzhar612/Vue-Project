<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { movies } from '../data/movies.js'

const route = useRoute()

const keyword = ref(route.query.q || '')

watch(
  () => route.query.q,
  (newWord) => {
    keyword.value = newWord || ''
  }
)

const results = computed(() => {
  const word = keyword.value.toLowerCase()
  if (word === '') return []
  return movies.filter((m) => m.title.toLowerCase().includes(word))
})

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
