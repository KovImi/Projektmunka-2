<template>
  <div class="container mt-5">
    <div v-if="loading" class="loader-wrapper">
      <Loader />
    </div>
    <div v-else>
      <h1 class="text-center">Órarend</h1>
      <p class="text-center">Ha le szeretnél foglalni egy időpontot, kattints az adott órára!</p>
      <div class="table-responsive border">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Időpont</th>
              <th v-for="day in days" :key="day">{{ day }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="timeSlot in timeSlots" :key="timeSlot">
              <td>{{ timeSlot }}</td>
              <td v-for="day in days" :key="day" @click="openModal(day, timeSlot)">
                <div v-if="bookedSubjects[day] && bookedSubjects[day][timeSlot]">
                  <div>{{ bookedSubjects[day][timeSlot].subject_name }}</div>
                  <div>{{ bookedSubjects[day][timeSlot].subject_level }}</div>
                  <div>{{ bookedSubjects[day][timeSlot].subject_lang }}</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-center mt-5">Lefoglalt időpontok</h2>
      <div class="table-responsive border mt-3">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Időpont</th>
              <th>Nap</th>
              <th>Tantárgy</th>
              <th>Művelet</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="booking in userBookings" :key="booking.booking_id">
              <td>{{ booking.start_time }} - {{ booking.end_time }}</td>
              <td>{{ booking.timetable_day }}</td>
              <td>{{ booking.subject_name }}</td>
              <td>
                <button @click="confirmDelete(booking.booking_id)" class="btn btn-danger">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content container">
        <span class="close" @click="closeModal">&times;</span>
        <div v-if="modalContent" class="modal-body">
          <h2 class="my-3">{{ capitalizedModalContent.subject_name }}</h2>
          <p>Szint: {{ capitalizedModalContent.subject_level }}</p>
          <p>Nyelv: {{ capitalizedModalContent.subject_lang }}</p>
          <p>Leírás: {{ capitalizedModalContent.subject_desc }}</p>
          <p>Típus: {{ capitalizedModalContent.subject_type }}</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="bookTime">Időpont lefoglalása</button>
        </div>
      </div>
    </div>

    <div v-if="showDeleteConfirm" class="modal">
      <div class="modal-content container">
        <span class="close" @click="closeDeleteConfirm">&times;</span>
        <div class="modal-body">
          <h2 class="my-3">Biztos, hogy le szeretnéd mondani az időpontot?</h2>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeDeleteConfirm">Mégse</button>
            <button type="button" class="btn btn-danger" @click="deleteBooking">Igen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/plugins/axios';
import { bookTimeSlot, getUserBookings } from '@/services/booking-service';
import Loader from '@/components/Loader.vue';

export default {
  components: {
    Loader
  },
  data() {
    return {
      days: ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek'],
      timeSlots: [
        '8:00-9:00',
        '9:00-10:00',
        '10:00-11:00',
        '11:00-12:00',
        '12:00-13:00',
        '13:00-14:00',
        '14:00-15:00',
        '15:00-16:00',
        '16:00-17:00',
        '17:00-18:00',
        '18:00-19:00',
      ],
      bookedSubjects: {}, // Object to track booked subjects per week
      userBookings: [], // Array to track user bookings
      showModal: false,
      modalContent: null,
      showDeleteConfirm: false,
      bookingToDelete: null,
      loading: true // State to track loading
    };
  },
  computed: {
    capitalizedModalContent() {
      if (!this.modalContent) return {};
      return {
        subject_name: this.capitalizeFirstLetter(this.modalContent.subject_name),
        subject_level: this.capitalizeFirstLetter(this.modalContent.subject_level),
        subject_lang: this.capitalizeFirstLetter(this.modalContent.subject_lang),
        subject_desc: this.capitalizeFirstLetter(this.modalContent.subject_desc),
        subject_type: this.capitalizeFirstLetter(this.modalContent.subject_type),
      };
    }
  },
  methods: {
    capitalizeFirstLetter(string) {
      if (!string) return '';
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    async fetchTimetable() {
      try {
        const response = await axios.get('/timetable', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.timetableData = response.data;
        await this.populateTimetable();
        console.log('Timetable data:', this.timetableData);
      } catch (error) {
        console.error('Error fetching timetable:', error);
      }
    },
    async fetchUserBookings() {
      try {
        const response = await getUserBookings();
        this.userBookings = response;
        console.log('User bookings:', this.userBookings);
      } catch (error) {
        console.error('Error fetching user bookings:', error);
      }
    },
    async populateTimetable() {
      await this.fetchUserBookings(); // Fetch user bookings before populating timetable
      this.bookedSubjects = {
        'Hétfő': {},
        'Kedd': {},
        'Szerda': {},
        'Csütörtök': {},
        'Péntek': {}
      };
      for (const entry of this.timetableData) {
        const day = entry.timetable_day;
        const startHour = parseInt(entry.start_time.substring(0, 2));
        const endHour = startHour + 1;
        const time = `${startHour}:00-${endHour}:00`;
        if (this.bookedSubjects[day]) {
          const subjectDetails = await this.fetchSubjectDetails(entry.subject_id);
          this.bookedSubjects[day][time] = {
            ...subjectDetails,
            timetable_id: entry.timetable_id // Ensure timetable_id is included
          };
        }
      }
      this.loading = false; // Set loading to false after data is populated
    },
    async fetchSubjectDetails(subjectId) {
      try {
        const response = await axios.get(`/subject/${subjectId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        return response.data;
      } catch (error) {
        console.error(`Error fetching subject details for subject ID ${subjectId}:`, error);
        return null;
      }
    },
    openModal(day, timeSlot) {
      const subject = this.bookedSubjects[day][timeSlot];
      if (subject) {
        this.modalContent = subject;
        this.showModal = true;
      }
    },
    closeModal() {
      this.showModal = false;
      this.modalContent = null;
    },
    async bookTime() {
      try {
        console.log('Booking timetable_id:', this.modalContent.timetable_id);
        await bookTimeSlot(this.modalContent.timetable_id);
        alert('Időpont sikeresen lefoglalva!');
        this.closeModal();
        this.fetchUserBookings(); // Refresh user bookings after successful booking
      } catch (error) {
        if (error.response && error.response.status === 409) {
          alert('Ez az időpont már le van foglalva.');
        } else {
          console.error('Hiba történt a foglalás során:', error);
          alert('Hiba történt a foglalás során.');
        }
      }
    },
    confirmDelete(bookingId) {
      this.bookingToDelete = bookingId;
      this.showDeleteConfirm = true;
    },
    closeDeleteConfirm() {
      this.showDeleteConfirm = false;
      this.bookingToDelete = null;
    },
    async deleteBooking() {
      try {
        await axios.delete(`/delete_booking/${this.bookingToDelete}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        alert('Foglalás sikeresen törölve!');
        this.closeDeleteConfirm();
        this.fetchUserBookings(); // Refresh user bookings after successful deletion
      } catch (error) {
        console.error('Hiba történt a foglalás törlése során:', error);
        alert('Hiba történt a foglalás törlése során.');
      }
    }
  },
  async mounted() {
    await this.fetchTimetable();
  }
};
</script>

<style scoped>
.table {
  text-align: center;
}
td > div {
  cursor: pointer;
  text-transform: capitalize;
}

tr {
  height: 100px; /* Állítsd be a kívánt minimális magasságot */
  vertical-align: middle; /* Középre igazítja a tartalmat függőlegesen */
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 40%;
  text-align: center; /* Center align the content */
}

.modal-body {
  text-align: center; /* Center align the content */
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>