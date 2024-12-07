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
            <button class="profile-btn" @click="toggleDropdown">
              Profil <span class="triangle">&#9662;</span>
            </button>
            <ul class="dropdown-menu" :class="{ show: dropdownOpen }">
              <li><router-link class="dropdown-item" to="/profile" @click="closeDropdown">Fiókom</router-link></li>
              <li v-if="isAdmin"><router-link class="dropdown-item" to="/admin" @click="closeDropdown">Admin oldal</router-link></li>
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
  data() {
    return {
      dropdownOpen: false
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'isAdmin']),
  },
  methods: {
    ...mapActions(['logout']),
    handleLogout() {
      this.logout();
      this.$router.push('/');
      this.dropdownOpen = false;
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    closeDropdown() {
      this.dropdownOpen = false;
    }
  }
};
</script>

<style scoped>
.nav-btn {
  font-weight: bold;
}

.profile-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  padding: 10px 20px;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  font-weight: bold;
}

.profile-btn:hover {
  color: #012b05;
}

.triangle {
  margin-left: 5px;
  font-size: 18px;
  color: black;
}

.dropdown-menu {
  display: none;
  position: absolute;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin-top: 10px;
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.3s, transform 0.3s;
}

.dropdown-menu.show {
  display: block;
  opacity: 1;
  transform: translateY(0);
}

.dropdown-item {
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
}
</style>