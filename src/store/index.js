import { createStore } from 'vuex'
import axios from '@/plugins/axios'; // Importáljuk az axios-t a plugins mappából
import authService from '@/services/auth-service'; // Importáljuk az authService-t

export default createStore({
  state: {
    isLoggedIn: !!localStorage.getItem('token'),
    user: null,
    isAuthor: null,
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    user: state => state.user,
    isAuthor: state => state.isAuthor, // Új getter a rang lekéréséhez
  },
  mutations: {
    setLoggedIn(state, status) {
      state.isLoggedIn = status;
    },
    setUser(state, user) {
      state.user = user;
    },
    setIsAuthor(state, isAuthor) {
      state.isAuthor = isAuthor;
    }
  },
  actions: {
    async login({ commit }) {
      commit('setLoggedIn', true);
      try {
        const token = localStorage.getItem('token');
        console.log("tokenes: ", token);
        const response = await axios.get('/checkAuth', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data);

        const roles = response.data.roles;
        const isAuthor = roles.some(role => role.role_name === 'author');
        commit('setIsAuthor', isAuthor);
        console.log("isAuthor: ", isAuthor);
      } catch (error) {
        console.error('Error during /checkAuth API call:', error);
      }
    },
    async fetchUserData({ commit }) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('/checkAuth', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const username = response.data.username;
          const user = await authService.getUserByUsername(username, token);
          commit('setUser', user);
          console.log('User data:', user); // Log user data to console
          const roles = response.data.roles || [];
          const isAuthor = roles.some(role => role.role_name === 'author');
          commit('setIsAuthor', isAuthor);
          console.log("isAuthor: ", isAuthor);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    },
    logout({ commit }) {
      commit('setLoggedIn', false);
      commit('setUser', null);
      commit('setIsAuthor', false); // Rang törlése kijelentkezéskor
      localStorage.removeItem('token');
    },
    setUser({ commit }, user) {
      commit('setUser', user);
    }
  },
  modules: {
  }
})