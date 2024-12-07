import axios from '@/plugins/axios';

const getUserLogs = async (token) => {
  try {
    const response = await axios.get('/user_log', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Hiba történt a felhasználói naplók lekérése során.');
  }
};

const getTimetableLogs = async (token) => {
  try {
    const response = await axios.get('/timetable_log', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Hiba történt az órarendi naplók lekérése során.');
  }
};

const getSubjectLogs = async (token) => {
  try {
    const response = await axios.get('/subject_log', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Hiba történt a tantárgyi naplók lekérése során.');
  }
};

export default {
  getUserLogs,
  getTimetableLogs,
  getSubjectLogs
};