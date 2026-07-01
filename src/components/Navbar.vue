<script setup>
import { useWatchlistStore } from '../stores/watchlist.js'
const watchlist = useWatchlistStore()
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink> |
    <RouterLink to="/search">Search</RouterLink> |
    <RouterLink to="/watchlist">Watchlist ({{ watchlist.count }})</RouterLink>
  </nav>
  <hr />
</template>
