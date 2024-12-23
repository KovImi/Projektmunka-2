import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import PricesView from '../views/PricesView.vue';
import ContactView from '../views/ContactView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import BookingView from '../views/BookingView.vue';
import ProfileView from '@/views/ProfileView.vue';
import SubjectsView from '@/views/SubjectsView.vue';
import AdminView from '@/views/AdminView.vue';
import NotFoundView from '@/views/NotFoundView.vue'; // Importáljuk a 404-es oldalt
import store from '@/store';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/pricing', name: 'Pricing', component: PricesView },
  { path: '/contact', name: 'Contact', component: ContactView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },
  { path: '/appointment', name: 'Booking', component: BookingView },
  { path: '/profile', name: 'Profile', component: ProfileView, 
    beforeEnter: (to, from, next) => {
      if (!store.getters.isLoggedIn) {
        next('/login'); // Ha a felhasználó nincs bejelentkezve, átirányítjuk a bejelentkezési oldalra
      } else {
        next(); // Ha a felhasználó be van jelentkezve, engedjük tovább
      }
    }
  },
  { path: '/subjects', name: 'Subjects', component: SubjectsView },
  { path: '/admin', name: 'Admin', component: AdminView, 
    beforeEnter: (to, from, next) => {
      if (!store.getters.isAdmin) {
        next('/'); // Ha a felhasználó nem admin, átirányítjuk a főoldalra
      } else {
        next(); // Ha a felhasználó admin, engedjük tovább
      }
    }
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView } // 404-es oldal útvonala
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;