<template>
  <div class="container d-flex justify-content-center align-items-center mt-5 vh-50">
    <div class="p-4 mt-5" style="max-width: 400px; width: 50%;">
      <h1 class="text-center fw-bold">Belépés</h1>
      <hr class="w-25 mx-auto border-5 opacity-100 mt-4 login-border-small">
      <form class="mt-5" @submit.prevent="handleSubmit">
        <div class="mb-3">
          <input
            v-model="email"
            type="text"
            id="username"
            class="form-control"
            placeholder="E-mail"
          />
        </div>
        <div class="mb-3">
          <input
            v-model="password"
            type="password"
            id="password"
            class="form-control"
            placeholder="Jelszó"
          />
        </div>
        <div class="d-flex justify-content-center align-items-center mb-3">
          <a href="#" class="text-muted text-center">Elfelejtett jelszó?</a>
        </div>
        <div class="d-grid">
          <button type="submit" class="btn btn-success">Belépés</button>
        </div>
        <div v-if="loginError" class="alert alert-danger mt-3">{{ loginError }}</div>
      </form>
      <div class="text-center mt-5">
        <span>Még nincs fiókod?</span>
        <Button to="/register" buttonClass="register-btn" class="ms-2 mt-2">Regisztráció</Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';
import authService from '@/services/auth-service';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    Button,
  },
  data() {
    return {
      email: '',
      password: '',
      loginError: ''
    };
  },
  computed: {
    ...mapGetters(['role'])
  },
  methods: {
    ...mapActions(['login', 'setUser']),
    async handleSubmit() {
      try {
        const response = await authService.login(this.email, this.password);
        localStorage.setItem('token', response.jwt); // localStorage token
        this.login(); // Vuex login action
        console.log("Sikeres Bejelentkezés!");
        this.loginError = '';
        const userData = await authService.getUserByEmail(this.email, response.jwt);
        this.setUser(userData); // Vuex-ben tároljuk a felhasználó adatait
        console.log("User Data:", userData);
        this.$router.push('/');
      } catch (error) {
        this.loginError = 'Hibás felhasználónév vagy jelszó';
        console.error(error.message);
      }
    },
  },
};
</script>

<style scoped>
h2 {
  font-weight: bold;
}

.card {
  border-radius: 8px;
}

.btn-success {
  background-color: #4CAF50;
  border-color: #4CAF50;
}

.btn-outline-dark {
  color: #333;
  border-color: #333;
}

a {
  text-decoration: none;
  color: #6c757d;
}

a:hover {
  color: #000;
}
.login-border-small {
  border-color: #4CAF50;
}
</style>