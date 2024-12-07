import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // Itt kell beállítani a saját szerverünk URL-jét
  timeout: 100000,
  headers: { 'Content-Type': 'application/json' }
});

export default instance;