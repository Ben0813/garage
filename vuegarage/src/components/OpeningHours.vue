<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const openingHours = ref({});

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/opening-hours');
    openingHours.value = response.data;
  } catch (error) {
    console.error('Error fetching opening hours:', error);
    error.value = 'Une erreur est survenue lors de la récupération des horaires d\'ouverture.';
  }
});
</script>

<template>
  <div class="opening-hours">
    <h2>Horaires d'ouverture</h2>
    <p v-for="(time, day) in openingHours" :key="day">
      {{ day }}: {{ time }}
    </p>
  </div>
  <div v-if="error" class="error">
    {{ error }}
  </div>
</template>

<style scoped>
.opening-hours {
  padding: 20px;
  background-color: #f9f9f9;
}
</style>