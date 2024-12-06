<template>
  <div class="container mt-5">
    <h1 class="display-4 mb-5">Admin Oldal</h1>
    <p class="lead">Itt adminisztrátori funkciókat érhetsz el.</p>
    <div v-if="!showUsersList && !showLogsList">
      <div class="admin-section" @click="showUsersList = true">
        <h3>Felhasználók</h3>
        <p>Itt kezelheted a felhasználókat</p>
      </div>
      <div class="admin-section" @click="showLogsList = true">
        <h3>Logok</h3>
        <p>Itt megtekintheted a logokat</p>
      </div>
      <!-- További sávok ide kerülnek -->
    </div>
    <div v-if="showUsersList">
      <UsersList />
      <button @click="showUsersList = false" class="btn btn-secondary mt-3">Vissza</button>
    </div>
    <div v-if="showLogsList">
      <LogList />
      <button @click="showLogsList = false" class="btn btn-secondary mt-3">Vissza</button>
    </div>
  </div>
</template>

<script>
import UsersList from '@/components/UsersList.vue';
import LogList from '@/components/LogList.vue';

export default {
  name: 'AdminView',
  components: {
    UsersList,
    LogList
  },
  data() {
    return {
      showUsersList: false,
      showLogsList: false
    };
  }
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: auto;
}

.admin-section {
  padding: 20px;
  margin-bottom: 10px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.admin-section:hover {
  background-color: #e2e6ea;
}
</style>