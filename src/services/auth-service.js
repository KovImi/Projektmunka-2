import axios from '@/plugins/axios';

const login = async (email, password) => {
  try {
    const response = await axios.post('/user/login', {
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Hiba történt a bejelentkezés során.');
  }
};

const register = async (name, username, password, email) => {
  try {
    const response = await axios.post('/user', {
      name,
      username,
      password,
      email
    });
    console.log("response", response);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message, 'Hiba történt a regisztráció során.');
  }
};

export default {
  login,
  register
};