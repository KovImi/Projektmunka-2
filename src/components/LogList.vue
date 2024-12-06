<template>
  <div>
    <h2 class="text-center">Logok</h2>
    <div v-if="loading" class="loader">Betöltés...</div>
    <div v-else>
      <table class="table table-striped text-center">
        <thead>
          <tr>
            <th>Log Típus</th>
            <th>Adatok</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in logs" :key="log.id">
            <td>{{ log.type }}</td>
            <td>{{ log.data }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import logService from '@/services/log-service';

export default {
  data() {
    return {
      logs: [],
      loading: true
    };
  },
  async created() {
    try {
      const token = localStorage.getItem('token');
      const userLogs = await logService.getUserLogs(token);
      const timetableLogs = await logService.getTimetableLogs(token);
      const subjectLogs = await logService.getSubjectLogs(token);
      this.logs = [
        ...userLogs.map(log => ({ type: 'User Log', data: log })),
        ...timetableLogs.map(log => ({ type: 'Timetable Log', data: log })),
        ...subjectLogs.map(log => ({ type: 'Subject Log', data: log }))
      ];
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.loader {
  text-align: center;
  margin-top: 20px;
}

.table {
  margin-top: 20px;
}

.table th, .table td {
  vertical-align: middle;
  text-align: center;
}
</style>