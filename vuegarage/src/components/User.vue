<script setup>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      user: {
        username: '',
        role: ''
      },
      isLoggedIn: false
    }
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/users', {
          username: this.username,
          password: this.password
        });
        this.user = response.data.user;
        this.isLoggedIn = true;
      } catch (error) {
        console.error('Error logging in:', error);
        error.value = 'Une erreur est survenue lors de la connexion.';
      }
    },
    logout() {
      this.user = {
        username: '',
        role: ''
      };
      this.isLoggedIn = false;
    }
  }
}
</script>

<template>

<div>
  <hi>Bienvenue, {{ user.username }}</hi>
  <p>Vous êtes connecté en tant que {{ user.role }}</p>
  <button v-if="!isLoggedIn" @click="login">Se connecter</button>
  <button v-else @click="logout">Se déconnecter</button>
</div>
  <div v-if="error" class="error">
    {{ error }}
  </div>


</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

</style>
