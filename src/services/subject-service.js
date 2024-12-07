import axios from '@/plugins/axios';

export const getSubjects = async () => {
  try {
    const response = await axios.get('/subject', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log('Subjects:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching subjects:', error);
    throw error;
  }
};

export const addSubject = async (subjectData) => {
  try {
    const response = await axios.post('/subject', subjectData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding subject:', error);
    throw error;
  }
};

export const deleteSubject = async (subjectId) => {
  try {
    const response = await axios.delete(`/subject/${subjectId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting subject:', error);
    throw error;
  }
};