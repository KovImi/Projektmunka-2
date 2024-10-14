<template>
  <div class="container d-flex justify-content-center align-items-center mt-5 vh-50">
    <div class="p-4 mt-5" style="max-width: 400px; width: 50%;">
      <h1 class="text-center fw-bold">Belépés</h1>
      

      <hr class="w-25 mx-auto border-5 opacity-100 mt-4 login-border-small">

      <form class="mt-5" @submit.prevent="handleSubmit">
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
        <div class="d-flex justify-content-between align-items-center mb-3">
          <a href="#" class="text-muted">Elfelejtett jelszó?</a>
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

export default {
  components: {
    Button,
  },
  data() {
    return {
      isLoggedin: false,
      showerror: false,
      username: '',
      password: '',
      loginError: ''
    };
  },
  methods: {
    handleSubmit() {
      // Replace with actual validation logic
      const validUsername = 'user';
      const validPassword = 'password';

      if (this.username === validUsername && this.password === validPassword) {
        this.isLoggedin = true;
        this.loginError = '';
        this.$router.push('/');
      } else {
        this.isLoggedin = false;
        this.loginError = 'Hibás felhasználónév vagy jelszó';
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
  color: #4CAF50;
}

</style>