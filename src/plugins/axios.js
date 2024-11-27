import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // Állítsd be a backend API alap URL-jét
  timeout: 100000,
  headers: { 'Content-Type': 'application/json' }
});

export default instance;