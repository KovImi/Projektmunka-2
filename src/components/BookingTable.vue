<template>
  <div class="table-responsive">
    <table class="table table-bordered table-striped text-center">
      <thead>
        <tr>
          <th>Időpont</th>
          <th v-for="day in days" :key="day">{{ day.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(timeSlot, index) in timeSlots" :key="index">
          <td>{{ timeSlot }}</td>
          <td v-for="day in days" :key="day.label" :class="{ 'bg-light': index % 2 === 0 }">
            <div v-if="day.bookings[index] && day.bookings[index].subject" class="booking">
              <span class="subject">{{ day.bookings[index].subject }}</span><br />
              <span class="level">{{ day.bookings[index].level }}</span><br />
              <span v-if="day.bookings[index].availableSeats > 0" class="text-success">
                (Szabad hely: {{ day.bookings[index].availableSeats }})
              </span>
              <span v-else class="text-danger">Nincs hely</span><br />
              <input type="checkbox" 
                     :class="getCheckboxClass(day.bookings[index])" 
                     :disabled="day.bookings[index].availableSeats === 0 && !day.bookings[index].booked" 
                     v-model="day.bookings[index].selected" />
              <div v-if="day.bookings[index].booked" class="booked-indicator"></div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-end mt-3">
      <button class="btn btn-dark me-2" @click="emitCancelSelectedBookings">Kijelölt időpontok lemondása</button>
      <button class="btn btn-success" @click="emitBookSelectedSlots">Kijelölt időpontok foglalása</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    days: Array,
    timeSlots: Array,
    bookedSubjects: Object,
    currentWeek: Number
  },
  methods: {
    getCheckboxClass(booking) {
      if (booking.booked) {
        return 'booked';
      } else if (booking.selected) {
        return 'selected';
      } else if (booking.availableSeats === 0) {
        return 'full';
      } else {
        return '';
      }
    },
    emitBookSelectedSlots() {
      this.$emit('book-selected-slots');
    },
    emitCancelSelectedBookings() {
      this.$emit('cancel-selected-bookings');
    }
  }
};
</script>

<style scoped>
.table {
  text-align: center;
}

.booking {
  font-size: 0.9rem;
  cursor: pointer;
}

.subject {
  font-weight: bold;
}

.level {
  color: gray;
}

.booked-indicator {
  width: 100%;
  height: 5px;
  background-color: green;
  margin-top: 5px;
}

.table tbody tr {
  height: 100px; /* Set a fixed height for all rows */
}

.table th, .table td {
  width: 150px; /* Set a fixed width for all columns */
}
</style>
