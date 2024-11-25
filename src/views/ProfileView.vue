<template>
  <div class="container mt-5">
    <h1 class="display-4 mb-5">Profil</h1>
    <div v-if="user">
      <p><strong>Név:</strong> {{ user.name }}</p>
      <p><strong>Felhasználónév:</strong> {{ user.username }}</p>
      <p><strong>E-mail:</strong> {{ user.email }}</p>
    </div>
    <div v-else>
      <p>Felhasználói adatok betöltése...</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ProfileView',
  computed: {
    ...mapGetters(['user']),
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}
</style>