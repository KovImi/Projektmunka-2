import axios from '@/plugins/axios';

const login = async (email, password) => {
  try {
    const response = await axios.post('/user/login', {
      email,
      password
    });
    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Hiba történt a bejelentkezés során.');
  }
};

const register = async (name, username, password, email) => {
  try {
    console.log('Register data:', name, username, password, email);
    const response = await axios.post('/user', {
      email,
      password,
      username,
      name,
    });
    console.log('Register response:', response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const getUserByEmail = async (email, token) => {
  try {
    const response = await axios.get(`/userEmail/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Hiba történt a felhasználó adatainak lekérése során.');
  }
};

const getUserByUsername = async (username, token) => {
  try {
    const response = await axios.get(`/user2/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Hiba történt a felhasználó adatainak lekérése során.');
  }
};
const updateUser = async (userId, userData, token) => {
  try {
    const response = await axios.put(`/user/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Hiba történt a felhasználó adatainak frissítése során.');
  }
};
export default {
  login,
  register,
  getUserByEmail,
  getUserByUsername,
  updateUser
};