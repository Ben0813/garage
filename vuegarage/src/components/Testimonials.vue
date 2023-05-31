<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const testimonials = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/testimonials');
    testimonials.value = response.data;
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    error.value = 'Une erreur est survenue lors de la récupération des témoignages.';
  }
});
</script>

<template>
  <div class="testimonials">
    <h1>Témoignages</h1>
    <ul>
      <li v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-card">
        <h2>{{ testimonial.name }}</h2>
        <p><strong>Message :</strong> {{ testimonial.message }}</p>
        <p><strong>Note :</strong> {{ testimonial.rating }}/5</p>
      </li>
    </ul>
  </div>
  <div v-if="error" class="error">
    {{ error }}
  </div>
</template>

<style scoped>
.testimonials {
  width: 80%;
  margin: 0 auto;
}

.testimonial-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  transition: box-shadow 0.3s ease;
}

.testimonial-card:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>