import axios from '@/plugins/axios';

export const getSubjects = async () => {
  try {
    const response = await axios.get('/subject', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching subjects:', error);
    throw error;
  }
};