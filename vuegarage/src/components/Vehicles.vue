<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const vehicles = ref([]);
const filters = ref({
  maxPrice: Infinity,
  maxMileage: Infinity,
  minYear: 0
});

const filteredVehicles = computed(() => {
  return vehicles.value.filter(vehicle => {
    return vehicle.price <= filters.value.maxPrice &&
        vehicle.mileage <= filters.value.maxMileage &&
        new Date(vehicle.year).getFullYear() >= filters.value.minYear;
  });
});

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/vehicles');
    vehicles.value = response.data;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    error.value = 'Une erreur est survenue lors de la récupération des véhicules.';
  }
});


</script>

<template>
    <div class="vehicles">
      <h1>Véhicules</h1>
      <div class="filters">
        <label>
          Prix max :
          <input type="number" v-model.number="filters.maxPrice" />
        </label>
        <label>
          Kilométrage max :
          <input type="number" v-model.number="filters.maxMileage" />
        </label>
        <label>
          Année min :
          <input type="number" v-model.number="filters.minYear" />
        </label>
      </div>
      <ul>
        <li v-for="vehicle in filteredVehicles" :key="vehicle.id" class="vehicle-card">
          <img :src="vehicle.image" :alt="vehicle.model" class="vehicle-image" />
          <h2>{{ vehicle.brand }} {{ vehicle.model }}</h2>
          <p>{{ vehicle.price }} €</p>
          <p>{{ vehicle.mileage }} km</p>
          <p>{{ vehicle.year }}</p>
        </li>
      </ul>
    </div>
  <div v-if="error" class="error">
    {{ error }}
  </div>
</template>

<style scoped>
.vehicles {
  width: 80%;
  margin: 0 auto;
}

.vehicle-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  transition: box-shadow 0.3s ease;
}

.vehicle-card:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.vehicle-image {
  width: 100%;
  height: auto;
  margin-bottom: 15px;
}

.filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

</style>