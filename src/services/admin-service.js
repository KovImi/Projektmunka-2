import axios from '@/plugins/axios';

const getUsers = async (token) => {
  try {
    const response = await axios.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Hiba történt a felhasználók lekérése során.');
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
    throw new Error(error.response.data.message || 'Hiba történt a felhasználó frissítése során.');
  }
};

const deleteUser = async (userId, token) => {
  try {
    const response = await axios.delete(`/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Hiba történt a felhasználó törlése során.');
  }
};

const addUser = async (userData, token) => {
  try {
    const response = await axios.post('/user', userData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Hiba történt a felhasználó hozzáadása során.');
  }
};

export default {
  getUsers,
  updateUser,
  deleteUser,
  addUser
};