<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="col-lg-3"></div>
      <div class="col-lg-6"><h2 class="text-center flex-grow-1">Felhasználók listája</h2></div>
      <div class="col-lg-3">
        <button @click="showAddUserModal = true" class="btn btn-success">Új felhasználó hozzáadása</button>
      </div>
    </div>
    <div v-if="loading" class="loader">Betöltés...</div>
    <div v-else>
      <table class="table table-striped text-center">
        <thead>
          <tr>
            <th @click="sortUsers('name')">Név</th>
            <th @click="sortUsers('username')">Felhasználónév</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in sortedUsers" :key="user.user_id">
            <td>{{ user.name }}</td>
            <td>{{ user.username }}</td>
            <td>
              <button @click="editUser(user)" class="btn btn-primary btn-sm me-2">
                <i class="bi bi-pencil"></i>
              </button>
              <button @click="deleteUser(user.user_id)" class="btn btn-danger btn-sm">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit User Modal -->
    <div v-if="showEditModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeEditModal">&times;</span>
        <h2>Szerkesztés: {{ selectedUser.name }}</h2>
        <form @submit.prevent="saveChanges">
          <div class="form-group">
            <label for="name">Név</label>
            <input type="text" id="name" v-model="selectedUser.name" class="form-control" />
          </div>
          <div class="form-group">
            <label for="username">Felhasználónév</label>
            <input type="text" id="username" v-model="selectedUser.username" class="form-control" />
          </div>
          <div class="form-group">
            <label for="email">E-mail</label>
            <input type="email" id="email" v-model="selectedUser.email" class="form-control" />
          </div>
          <div class="form-group">
            <label for="newPassword">Új jelszó</label>
            <input type="password" id="newPassword" v-model="newPassword" class="form-control" />
          </div>
          <div class="form-group">
            <label for="created_at">Létrehozva</label>
            <input type="text" id="created_at" v-model="selectedUser.created_at" class="form-control" disabled />
          </div>
          <button type="submit" class="btn btn-success mt-3">Mentés</button>
        </form>
      </div>
    </div>

    <!-- Add User Modal -->
    <div v-if="showAddUserModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeAddUserModal">&times;</span>
        <h2>Új felhasználó hozzáadása</h2>
        <form @submit.prevent="addUser">
          <div class="form-group">
            <label for="newName">Név</label>
            <input type="text" id="newName" v-model="newUser.name" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="newUsername">Felhasználónév</label>
            <input type="text" id="newUsername" v-model="newUser.username" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="newEmail">E-mail</label>
            <input type="email" id="newEmail" v-model="newUser.email" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="newPassword">Jelszó</label>
            <input type="password" id="newPassword" v-model="newUser.password" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-success mt-3">Hozzáadás</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import adminService from '@/services/admin-service';

export default {
  name: 'UsersList',
  data() {
    return {
      users: [],
      loading: true,
      showEditModal: false,
      showAddUserModal: false,
      selectedUser: null,
      newUser: {
        name: '',
        username: '',
        email: '',
        password: ''
      },
      newPassword: '',
      sortKey: '',
      sortOrder: 0 // 0: alapértelmezett, 1: növekvő, -1: csökkenő
    };
  },
  computed: {
    sortedUsers() {
      if (this.sortOrder === 0) {
        return this.users;
      }
      return [...this.users].sort((a, b) => {
        let result = 0;
        if (a[this.sortKey] > b[this.sortKey]) {
          result = 1;
        } else if (a[this.sortKey] < b[this.sortKey]) {
          result = -1;
        }
        return result * this.sortOrder;
      });
    }
  },
  async created() {
    try {
      const token = localStorage.getItem('token');
      this.users = await adminService.getUsers(token);
      console.log('Users:', this.users);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    sortUsers(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 1 ? -1 : 1;
      } else {
        this.sortKey = key;
        this.sortOrder = 1;
      }
    },
    editUser(user) {
      this.selectedUser = { ...user };
      this.newPassword = '';
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
      this.selectedUser = null;
      this.newPassword = '';
    },
    async saveChanges() {
      try {
        const token = localStorage.getItem('token');
        const updatedUser = { ...this.selectedUser };
        if (this.newPassword) {
          updatedUser.password = this.newPassword;
        }
        await adminService.updateUser(this.selectedUser.user_id, updatedUser, token);
        const index = this.users.findIndex(user => user.user_id === this.selectedUser.user_id);
        if (index !== -1) {
          this.users.splice(index, 1, this.selectedUser);
        }
        this.closeEditModal();
      } catch (error) {
        console.error('Error saving changes:', error);
      }
    },
    async deleteUser(userId) {
      if (confirm('Biztosan törölni szeretnéd ezt a felhasználót?')) {
        try {
          const token = localStorage.getItem('token');
          await adminService.deleteUser(userId, token);
          this.users = this.users.filter(user => user.user_id !== userId);
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      }
    },
    async addUser() {
      try {
        const token = localStorage.getItem('token');
        const newUser = { ...this.newUser };
        await adminService.addUser(newUser, token);
        this.users.push(newUser);
        this.closeAddUserModal();
      } catch (error) {
        console.error('Error adding user:', error);
      }
    },
    closeAddUserModal() {
      this.showAddUserModal = false;
      this.newUser = {
        name: '',
        username: '',
        email: '',
        password: ''
      };
    }
  }
};
</script>

<style scoped>
.loader {
  text-align: center;
  margin-top: 20px;
}

.table {
  margin-top: 20px;
}

.table th, .table td {
  vertical-align: middle;
  text-align: center;
  cursor: pointer;
  user-select: none; /* Kijelölhetetlenné teszi a táblázat fejléceit */
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 0.2rem;
}

.bi-pencil, .bi-trash {
  font-size: 1.2rem;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 40%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>