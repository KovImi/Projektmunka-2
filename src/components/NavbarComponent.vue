<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top">
    <div class="container py-3">
      <a class="navbar-brand"><router-link class="nav-link nav-btn" to="/">Minta Mária</router-link></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item px-3">
            <router-link class="nav-link nav-btn" to="/">Főoldal</router-link>
          </li>
          <li class="nav-item px-3">
            <router-link class="nav-link nav-btn" to="/appointment"><strong>Időpontfoglalás</strong></router-link>
          </li>
          <li class="nav-item px-3">
            <router-link class="nav-link nav-btn" to="/pricing">Árak</router-link>
          </li>
          <li class="nav-item px-3">
            <router-link class="nav-link nav-btn" to="/contact">Kapcsolat</router-link>
          </li>
        </ul>
        <div class="d-flex">
          <Button v-if="!isLoggedIn" to="/register" buttonClass="register-btn" class="me-2">Regisztráció</Button>
          <Button v-if="!isLoggedIn" to="/login" buttonClass="login-btn">Belépés</Button>
          <div v-if="isLoggedIn" class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              Profil
            </button>
            <ul class="dropdown-menu" aria-labelledby="profileDropdown">
              <li><router-link class="dropdown-item" to="/profile">Fiókom</router-link></li>
              <li v-if="isAdmin"><router-link class="dropdown-item" to="/admin">Admin oldal</router-link></li> <!-- Admin oldal link -->
              <li><button class="dropdown-item" @click="handleLogout">Kijelentkezés</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Button from './Button.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "NavbarComponent",
  components: {
    Button
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'isAdmin']), // Hozzáadjuk az isAdmin gettert
  },
  methods: {
    ...mapActions(['logout']),
    handleLogout() {
      this.logout();
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.nav-btn {
  font-weight: bold;
}
</style>