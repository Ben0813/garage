<script steup>
export default {
  name: 'Form',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    submitForm() {
      const formData = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      console.log(formData)
    }
  }
}


</script>

<template>

<form @submit.prevent="submitForm">
  <input type="text" v-model="name" placeholder="Name" />
  <input type="text" v-model="email" placeholder="Email" />
  <input type="password" v-model="password" placeholder="Password" />

  <button type="submit">Submit</button>
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