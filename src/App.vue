<template>
  
  <div id="app">
    <NavbarComponent />
    <router-view />
  </div>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';


export default {
  components: {
    NavbarComponent,
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap');
#app {
  font-family:"Roboto Slab", Avenir, Helvetica, Arial, sans-serif;
}
</style>
