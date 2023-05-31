<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const services = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/services');
    services.value = response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    error.value = 'Une erreur est survenue lors de la récupération des services.';
  }
});
</script>

<template>
  <div class="services">
    <h1>Services</h1>
    <ul>
      <li v-for="service in services" :key="service.id" class="service-card">
        <h2>{{ service.name }}</h2>
        <p><strong>Description :</strong> {{ service.description }}</p>
        <p><strong>Prix :</strong> {{ service.price }}</p>
      </li>
    </ul>
  </div>
  <div v-if="error" class="error">
    {{ error }}
  </div>
</template>

<style scoped>
.services {
  width: 80%;
  margin: 0 auto;
}

.service-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  transition: box-shadow 0.3s ease;
}

.service-card:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>