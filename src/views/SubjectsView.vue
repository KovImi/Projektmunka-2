<template>
  <div class="container mt-5">
    <h1 class="text-center mb-5">Tantárgyak</h1>
    <div v-if="loading" class="loader-wrapper">
      <Loader />
    </div>
    <div v-else class="row">
      <div class="col-md-4" v-for="subject in capitalizedSubjects" :key="subject.subject_id">
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title mb-3">{{ subject.subject_name }}</h5>
            <p class="card-text mb-1">Szint: {{ subject.subject_level }}</p>
            <p class="card-text">Nyelv: {{ subject.subject_lang }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSubjects } from '@/services/subject-service';
import Loader from '@/components/Loader.vue';

export default {
  components: {
    Loader
  },
  data() {
    return {
      subjects: [],
      loading: true
    };
  },
  computed: {
    capitalizedSubjects() {
      return this.subjects.map(subject => ({
        ...subject,
        subject_name: this.capitalizeFirstLetter(subject.subject_name)
      }));
    }
  },
  methods: {
    capitalizeFirstLetter(string) {
      if (!string) return '';
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  },
  async created() {
    try {
      this.subjects = await getSubjects();
    } catch (error) {
      console.error('Error fetching subjects:', error);
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>

</style>