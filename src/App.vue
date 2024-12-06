<template>
  
  <div id="app">
    <NavbarComponent />
    <router-view />
  </div>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    NavbarComponent,
  },
  created() {
    this.fetchUserData();
  },
  methods: {
    ...mapActions(['fetchUserData']),
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap');
#app {
  font-family:"Roboto Slab", Avenir, Helvetica, Arial, sans-serif;
}
</style>
