<template>
  <nav class="navbar navbar-expand-lg navbar-light">
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
          <a href="#" class="btn register-btn rounded-pill me-2">Regisztráció</a>
          <a href="#" class="btn login-btn rounded-pill">Belépés</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarComponent",
};
</script>

<style scoped>
.nav-btn {
  font-weight: bold;
}
.btn {
  align-items: center;
  background-clip: padding-box;
  border: 1px solid transparent;
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-family: system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  min-height: 3rem;
  padding: calc(.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;
}
.register-btn {
  background-color: #333333;
}
.login-btn {
  background-color: #4CAF50;
}
.btn:hover,
.btn:focus {
  color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
}
.register-btn:hover,
.register-btn:focus {
  background-color: #4d4d4d; /* Sötétebb szürke a hover állapothoz */
}
.login-btn:hover,
.login-btn:focus {
  background-color: #45a049; /* Sötétebb zöld a hover állapothoz */
}
.btn:hover {
  transform: translateY(-2px);
}
.btn:active {
  box-shadow: rgba(0, 0, 0, .06) 0 2px 4px;
  transform: translateY(0);
}
.register-btn:active {
  background-color: #1a1a1a; /* Még sötétebb szürke az active állapothoz */
}
.login-btn:active {
  background-color: #388e3c; /* Még sötétebb zöld az active állapothoz */
}
</style>