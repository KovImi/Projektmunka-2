<template>
  <div class="container mt-5">
    <div v-if="!showUsersList && !showLogsList">
      <h1 class="display-4 mb-5">Admin Oldal</h1>
      <p class="lead">Itt adminisztrátori funkciókat érhetsz el.</p>
    </div>

    <div v-if="!showUsersList && !showLogsList">
      <div class="admin-section" @click="showUsersList = true">
        <h3>Felhasználók</h3>
        <p>Itt kezelheted a felhasználókat</p>
      </div>
      <div class="admin-section" @click="showLogsList = true">
        <h3>Logok</h3>
        <p>Itt megtekintheted a logokat</p>
      </div>
    </div>
  </div>
    <div v-if="showUsersList" class="container">
      <button @click="showUsersList = false" class="custom-back-button"><i class="bi bi-arrow-left"></i></button>
      <UsersList />
    </div>
    <div v-if="showLogsList" class="logList container-fluid ml-0">
      <button @click="showLogsList = false" class="custom-back-button"><i class="bi bi-arrow-left"></i></button>
      <LogList />
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
.logList {
  width: 60%;
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
.custom-back-button {
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  border-radius: 30px;
}

.custom-back-button:hover {
  background-color: #2d8830;
}

</style>