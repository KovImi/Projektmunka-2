import axios from '@/plugins/axios';

export const bookTimeSlot = async (timetableId) => {
  try {
    const response = await axios.put(`/book/${timetableId}`, {
      timetable_id: timetableId,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Hiba történt a foglalás során:', error);
    throw error;
  }
};

export const getUserBookings = async () => {
  try {
    const response = await axios.get('/user_bookings', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Hiba történt a foglalások lekérése során:', error);
    throw error;
  }
};