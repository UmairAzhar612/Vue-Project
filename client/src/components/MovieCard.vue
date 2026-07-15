<script setup>
const props = defineProps({
  movie: { type: Object, required: true },
  isSaved: { type: Boolean, default: false },
})

const emit = defineEmits(['toggle'])

function save() {
  emit('toggle', props.movie)
}
</script>

<template>
  <div class="movie-card">
    <h3>
      <RouterLink :to="'/movie/' + movie.id">{{ movie.title }}</RouterLink>
    </h3>
    <p>Year: {{ movie.year }}</p>
    <p>Rating: {{ movie.rating }}/10</p>
    <button @click="save">
      <span v-if="isSaved">Remove from watchlist</span>
      <span v-else>Add to watchlist</span>
    </button>
    <hr />
  </div>
</template>
