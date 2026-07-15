<script setup>
import { onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import { useWatchlistStore } from './stores/watchlist.js'

const watchlist = useWatchlistStore()

// When the app first loads, get the saved watchlist from the backend.
onMounted(() => {
  watchlist.load()
})
</script>

<template>
  <div>
    <h1>Movie App</h1>
    <Navbar />
    <RouterView />
  </div>
</template>
