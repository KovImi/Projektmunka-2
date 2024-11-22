<template>
  <div class="container my-4">
    <!-- Felhasználói információ és kilépés gomb -->

    <!-- Hétválasztó nyilak -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <button @click="previousWeek" class="btn btn-outline-secondary" :disabled="currentWeek <= 0">&larr;</button>
      <h5>{{ currentWeekLabel }}</h5>
      <button @click="nextWeek" class="btn btn-outline-secondary">&rarr;</button>
    </div>

    <!-- Foglalási táblázat -->
    <BookingTable 
      :days="currentWeekData.days" 
      :timeSlots="timeSlots" 
      :bookedSubjects="bookedSubjects" 
      :currentWeek="currentWeek" 
      @book-selected-slots="bookSelectedSlots"
      @cancel-selected-bookings="cancelSelectedBookings"
    />
  </div>
</template>

<script>
import BookingTable from '@/components/BookingTable.vue';

export default {
  components: {
    BookingTable
  },
  data() {
    return {
      username: 'Minta Mária',
      weeksData: {}, // Object to store data for each week
      timeSlots: [
        '8:00-8:50',
        '9:00-9:50',
        '10:00-10:50',
        '13:00-13:50',
        '14:00-14:50',
        '15:00-15:50',
        '16:00-16:50',
        '17:00-17:50'
      ],
      currentWeek: 0, // Az aktuális hét indexe
      bookedSubjects: {} // Object to track booked subjects per week
    };
  },
  computed: {
    currentWeekLabel() {
      const today = new Date();
      const dayOfWeek = today.getDay();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1) + this.currentWeek * 7); // Adjust to Monday
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 4); // Friday
      return `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`;
    },
    currentWeekData() {
      return this.weeksData[this.currentWeek] || this.generateEmptyWeekData();
    }
  },
  methods: {
    previousWeek() {
      if (this.currentWeek > 0) {
        this.currentWeek--;
      }
    },
    nextWeek() {
      this.currentWeek++;
      this.initializeWeekData();
    },
    initializeWeekData() {
      if (!this.weeksData[this.currentWeek]) {
        this.weeksData[this.currentWeek] = this.generateWeekData();
      }
    },
    generateWeekData() {
      if (this.currentWeek === 0) {
        return {
          days: [
            {
              label: 'Hétfő',
              bookings: [
                { subject: 'Matek', level: 'egyetemi', availableSeats: 2 },
                { subject: 'Fizika', level: 'egyetemi', availableSeats: 1 },
                { subject: 'Info', level: 'egyetemi', availableSeats: 3 },
                {}, {}, {}, {}, {}
              ]
            },
            {
              label: 'Kedd',
              bookings: [
                { subject: 'Angol', level: 'B1', availableSeats: 1 },
                {}, {}, 
                { subject: 'Matek', level: 'középsuli', availableSeats: 2 },
                { subject: 'Info', level: 'egyetemi', availableSeats: 0 },
                { subject: 'Angol', level: 'B2', availableSeats: 3 },
                {}, {}
              ]
            },
            {
              label: 'Szerda',
              bookings: [
                { subject: 'Matek', level: 'egyetemi', availableSeats: 2 },
                {}, 
                { subject: 'Fizika', level: 'egyetemi', availableSeats: 1 },
                {}, 
                { subject: 'Matek', level: 'középsuli', availableSeats: 1 },
                {}, {}, {}
              ]
            },
            {
              label: 'Csütörtök',
              bookings: [
                { subject: 'Angol', level: 'B1', availableSeats: 2 },
                {}, {}, 
                { subject: 'Fizika', level: 'egyetemi', availableSeats: 0 },
                { subject: 'Angol', level: 'B2', availableSeats: 1 },
                {}, {}, {}
              ]
            },
            {
              label: 'Péntek',
              bookings: [
                { subject: 'Matek', level: 'egyetemi', availableSeats: 2 },
                {}, 
                { subject: 'Fizika', level: 'egyetemi', availableSeats: 0 },
                {}, 
                { subject: 'Info', level: 'egyetemi', availableSeats: 3 },
                {}, {}, {}
              ]
            },
          ]
        };
      } else if (this.currentWeek === 1) {
        return {
          days: [
            {
              label: 'Hétfő',
              bookings: [
                { subject: 'Kémia', level: 'egyetemi', availableSeats: 2 },
                { subject: 'Biológia', level: 'egyetemi', availableSeats: 1 },
                { subject: 'Történelem', level: 'egyetemi', availableSeats: 3 },
                {}, {}, {}, {}, {}
              ]
            },
            {
              label: 'Kedd',
              bookings: [
                { subject: 'Francia', level: 'B1', availableSeats: 1 },
                {}, {}, 
                { subject: 'Matek', level: 'középsuli', availableSeats: 2 },
                { subject: 'Info', level: 'egyetemi', availableSeats: 0 },
                { subject: 'Német', level: 'B2', availableSeats: 3 },
                {}, {}
              ]
            },
            {
              label: 'Szerda',
              bookings: [
                { subject: 'Matek', level: 'egyetemi', availableSeats: 2 },
                {}, 
                { subject: 'Fizika', level: 'egyetemi', availableSeats: 1 },
                {}, 
                { subject: 'Matek', level: 'középsuli', availableSeats: 1 },
                {}, {}, {}
              ]
            },
            {
              label: 'Csütörtök',
              bookings: [
                { subject: 'Angol', level: 'B1', availableSeats: 2 },
                {}, {}, 
                { subject: 'Fizika', level: 'egyetemi', availableSeats: 0 },
                { subject: 'Angol', level: 'B2', availableSeats: 1 },
                {}, {}, {}
              ]
            },
            {
              label: 'Péntek',
              bookings: [
                { subject: 'Matek', level: 'egyetemi', availableSeats: 2 },
                {}, 
                { subject: 'Fizika', level: 'egyetemi', availableSeats: 0 },
                {}, 
                { subject: 'Info', level: 'egyetemi', availableSeats: 3 },
                {}, {}, {}
              ]
            },
          ]
        };
      } else {
        return this.generateEmptyWeekData();
      }
    },
    generateEmptyWeekData() {
      return {
        days: [
          { label: 'Hétfő', bookings: Array(this.timeSlots.length).fill({}) },
          { label: 'Kedd', bookings: Array(this.timeSlots.length).fill({}) },
          { label: 'Szerda', bookings: Array(this.timeSlots.length).fill({}) },
          { label: 'Csütörtök', bookings: Array(this.timeSlots.length).fill({}) },
          { label: 'Péntek', bookings: Array(this.timeSlots.length).fill({}) }
        ]
      };
    },
    bookSelectedSlots() {
      if (!this.bookedSubjects[this.currentWeek]) {
        this.bookedSubjects[this.currentWeek] = new Set(); // Ensure the set is initialized
      }
      this.currentWeekData.days.forEach(day => {
        day.bookings.forEach(booking => {
          if (booking.selected && booking.availableSeats > 0 && !this.bookedSubjects[this.currentWeek].has(booking.subject)) {
            booking.availableSeats -= 1;
            booking.selected = false;
            booking.booked = true;
            this.bookedSubjects[this.currentWeek].add(booking.subject); // Add subject to booked set for the week
          }
        });
      });
    },
    cancelSelectedBookings() {
      if (!this.bookedSubjects[this.currentWeek]) {
        this.bookedSubjects[this.currentWeek] = new Set(); // Ensure the set is initialized
      }
      this.currentWeekData.days.forEach(day => {
        day.bookings.forEach(booking => {
          if (booking.selected && booking.booked) {
            booking.availableSeats += 1;
            booking.selected = false;
            booking.booked = false;
            this.bookedSubjects[this.currentWeek].delete(booking.subject); // Remove subject from booked set for the week
          }
        });
      });
    }
  },
  created() {
    this.initializeWeekData();
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

</style>
