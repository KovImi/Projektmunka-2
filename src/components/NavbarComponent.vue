<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top">
    <div class="container py-3">
      <a class="navbar-brand" href="#">Minta Mária</a>
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
          <Button to="/register" buttonClass="register-btn" class="me-2">Regisztráció</Button>
          <Button to="/login" buttonClass="login-btn">Belépés</Button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Button from './Button.vue';

export default {
  name: "NavbarComponent",
  components: {
    Button
  }
};
</script>

<style scoped>
.nav-btn {
  font-weight: bold;
}

</style>