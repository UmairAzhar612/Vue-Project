import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import SearchPage from '../pages/SearchPage.vue'
import MovieDetailPage from '../pages/MovieDetailPage.vue'
import WatchlistPage from '../pages/WatchlistPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/search', component: SearchPage },
  { path: '/movie/:id', component: MovieDetailPage },
  { path: '/watchlist', component: WatchlistPage },
  { path: '/:notFound(.*)', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
