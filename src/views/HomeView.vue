<template>
  <div class="container d-flex flex-column flex-lg-row align-items-center" style="margin-top: 6rem;">
    <div class="col-lg-6 d-flex flex-column align-items-center">
      <h1 class="display-4 text-center">Tanulj hatékonyan!</h1>
      <p class="lead text-center">
        Szia! Minta Mária vagyok, 20 éve segítek diákoknak a tananyag megértésében. Ha
        vizsgára készülsz, vagy csak szeretnéd jobban átlátni a tananyagot, szívesen segítek.
      </p>
      <Button to="/appointment" buttonClass="login-btn" class="btn-lg text-white my-4 px-5 py-4 fw-bold fs-4">Foglalj időpontot most!</Button>
      <p class="mt-3 text-center lead">
        vagy nézd meg a bemutatkozó oldalamat <router-link to="/about"><strong>itt</strong></router-link>.
      </p>
    </div>
    <div class="col-lg-6 d-flex justify-content-center d-none d-lg-flex">
      <img src="../assets/Teacher.png" alt="teacher" class="img-fluid max-width-75 teacherPic">
    </div>
  </div>
</template>

<script>
import Button from "../components/Button.vue";

export default {
  name: "HomeView",
  components: {
    Button
  }
};
</script>

<style scoped>
  .teacherPic {
    height: 40rem;
  }
  h1 {
    font-weight: bold;
  }

</style>