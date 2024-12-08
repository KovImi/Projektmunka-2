<template>
  <div class="container text-center mt-5">
    <h1 class="display-4">404 - Oldal nem található</h1>
    <p class="lead">Sajnáljuk, de az oldal, amit keresel, nem található.</p>
    <router-link to="/" class="btn btn-secondary">Vissza a főoldalra</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView'
}
</script>

<style scoped>
.btn {
  border-radius: 20px;
}
.container {
  margin-top: 100px;
}
</style>