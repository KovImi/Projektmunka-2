<template>
  <div class="container mt-5">
    <h1 class="display-4 mb-5">Profil</h1>
    <div v-if="user">
      <form @submit.prevent="saveChanges">
        <div class="mb-3">
          <label for="name" class="form-label">Név</label>
          <input type="text" id="name" v-model="formData.name" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="username" class="form-label">Felhasználónév</label>
          <input type="text" id="username" v-model="formData.username" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">E-mail</label>
          <input type="email" id="email" v-model="formData.email" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Jelszó</label>
          <input type="password" id="password" v-model="formData.password" class="form-control" placeholder="Jelszó (opcionális)" />
        </div>
        <button type="submit" class="btn btn-primary">Változtatások mentése</button>
      </form>
    </div>
    <div v-else>
      <p>Felhasználói adatok betöltése...</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import authService from '@/services/auth-service';

export default {
  name: 'ProfileView',
  data() {
    return {
      formData: {
        name: '',
        username: '',
        email: '',
        password: ''
      }
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  watch: {
    user: {
      immediate: true,
      handler(newUser) {
        if (newUser) {
          this.formData = { ...newUser, password: '' };
        }
      }
    }
  },
  methods: {
    async saveChanges() {
      try {
        const token = localStorage.getItem('token');
        const userId = this.user.user_id;
        await authService.updateUser(userId, this.formData, token);
        alert('Változtatások sikeresen mentve!');
      } catch (error) {
        console.error('Hiba történt a változtatások mentése során:', error);
        alert('Hiba történt a változtatások mentése során.');
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}
</style>