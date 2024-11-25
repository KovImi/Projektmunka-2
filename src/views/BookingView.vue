<template>
  <div class="container">
    <table class="table">
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

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <div v-if="modalContent" class="modal-body">
          <h3>{{ modalContent.subject_name }}</h3>
          <p>Szint: {{ modalContent.subject_level }}</p>
          <p>Nyelv: {{ modalContent.subject_lang }}</p>
          <p>Leírás: {{ modalContent.subject_desc }}</p>
          <p>Típus: {{ modalContent.subject_type }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/plugins/axios';
export default {
  data() {
    return {
      username: 'Minta Mária',
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
      showModal: false,
      modalContent: null
    };
  },
  methods: {
    async fetchTimetable() {
      try {
        const response = await axios.get('/timetable', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.timetableData = response.data;
        this.populateTimetable();
        console.log('Timetable data:', this.timetableData);
      } catch (error) {
        console.error('Error fetching timetable:', error);
      }
    },
    async populateTimetable() {
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
          this.bookedSubjects[day][time] = subjectDetails;
        }
      }
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
    }
  },
  mounted() {
    this.fetchTimetable();
  }
};
</script>

<style scoped>
.table {
  text-align: center;
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
  width: 80%;
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