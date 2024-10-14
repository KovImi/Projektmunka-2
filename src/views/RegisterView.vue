<template>
  <div class="container d-flex justify-content-center align-items-center mt-5 vh-50">
    <div class="p-4 mt-5 register-form">
      <h1 class="text-center fw-bold">Regisztráció</h1>
      <hr class="w-25 mx-auto border-5 opacity-100 mt-4 login-border-small">

      <form class="mt-5" @submit.prevent="handleSubmit">
        <div class="mb-3">
          <input
            v-model="name"
            type="text"
            id="name"
            class="form-control"
            placeholder="Név"
          />
        </div>

        <div class="mb-3">
          <input
            v-model="username"
            type="text"
            id="username"
            class="form-control"
            placeholder="Felhasználónév"
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

        <div class="mb-3">
          <input
            v-model="confirmPassword"
            type="password"
            id="confirmPassword"
            class="form-control"
            placeholder="Jelszó ismét"
          />
        </div>

        <div class="mb-3">
          <input
            v-model="email"
            type="email"
            id="email"
            class="form-control"
            placeholder="E-mail"
          />
        </div>
        
        <div class="d-flex justify-content-center">
          <button type="submit" class="btn btn-dark mt-3 rounded-pill">Regisztráció</button>
        </div>
        <div v-if="registrationError" class="alert alert-danger mt-3">{{ registrationError }}</div>
      </form>
      <div class="text-center mt-4">
        <span>Már van fiókod?</span>
        <Button to="/login" buttonClass="login-btn" class="ms-2 mt-2">Belépés</Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  components: {
    Button,
  },
  data() {
    return {
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      registrationError: ''
    };
  },
  methods: {
    handleSubmit() {

      if (this.password !== this.confirmPassword) {
        this.registrationError = 'A jelszavak nem egyeznek!';
        return;
      }

      this.$router.push('/login');
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
  color: #4CAF50;
}
.register-form {
  width: 50%;
  max-width: 400px;
}
</style>