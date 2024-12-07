<template>
  <div class="container mt-5">
    <div class="row mb-3">
      <div class="col-lg-3"></div>
      <div class="col-lg-6">
        <h1 class="text-center">Tantárgyak</h1>
      </div>
      <div class="col-lg-3 text-end">
        <button v-if="isAuthor" class="btn btn-success" @click="showAddSubjectModal = true">Új tárgy hozzáadása</button>
      </div>
    </div>
    <div v-if="loading" class="loader-wrapper">
      <Loader />
    </div>
    <div v-else>
      <div class="row">
        <div class="col-md-4" v-for="subject in capitalizedSubjects" :key="subject.subject_id">
          <div class="card mb-3 subject-card" @click="openSubjectModal(subject)">
            <div class="card-body">
              <h5 class="card-title mb-3">{{ subject.subject_name }}</h5>
              <p class="card-text mb-1">Szint: {{ subject.subject_level }}</p>
              <p class="card-text">Nyelv: {{ subject.subject_lang }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Subject Modal -->
    <div v-if="showAddSubjectModal" class="modal">
      <div class="modal-content container">
        <span class="close d-flex justify-content-end mx-3" @click="closeAddSubjectModal">&times;</span>
        <div class="modal-body">
          <h2 class="my-3">Új tárgy hozzáadása</h2>
          <form @submit.prevent="addSubject">
            <div class="form-group">
              <label for="subject_name">Tárgy neve</label>
              <input type="text" v-model="newSubject.subject_name" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="subject_level">Szint</label>
              <input type="text" v-model="newSubject.subject_level" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="subject_lang">Nyelv</label>
              <input type="text" v-model="newSubject.subject_lang" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="subject_desc">Leírás</label>
              <textarea v-model="newSubject.subject_desc" class="form-control" required></textarea>
            </div>
            <div class="form-group">
              <label for="subject_type">Típus</label>
              <select v-model="newSubject.subject_type" class="form-control" required>
                <option value="online">Online</option>
                <option value="személyes">Személyes</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary mt-3">Hozzáadás</button>
          </form>
        </div>
      </div>
    </div>


    <div v-if="showSubjectModal" class="modal">
      <div class="modal-content container">
        <span class="close d-flex justify-content-end mx-3" @click="closeSubjectModal">&times;</span>
        <div class="modal-body">
          <h2 class="my-3">{{ selectedSubject.subject_name }}</h2>
          <p><strong>Szint:</strong> {{ selectedSubject.subject_level }}</p>
          <p><strong>Nyelv:</strong> {{ selectedSubject.subject_lang }}</p>
          <p><strong>Leírás:</strong> {{ selectedSubject.subject_desc }}</p>
          <p><strong>Típus:</strong> {{ selectedSubject.subject_type }}</p>
          <p><strong>Ár:</strong> {{ selectedSubject.subject_price }} Ft</p>
          <button v-if="isAuthor" class="btn btn-danger mt-3" @click="confirmDeleteSubject">Tantárgy törlése</button>
        </div>
      </div>
    </div>


    <div v-if="showDeleteConfirm" class="modal">
      <div class="modal-content container">
        <div class="modal-body">
          <h2 class="my-3">Biztos törölni akarod a "{{ selectedSubject.subject_name }}" tárgyat?</h2>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeDeleteConfirm">Mégse</button>
          <button type="button" class="btn btn-danger" @click="deleteSubject">Igen</button>
        </div>
      </div>
    </div>

    <div v-if="showAlert" class="alert alert-success alert-dismissible fade show fixed-bottom m-3" role="alert">
      {{ alertMessage }}
      <button type="button" class="btn-close" @click="showAlert = false" aria-label="Close"></button>
    </div>

  </div>
</template>

<script>
import { getSubjects, addSubject, deleteSubject } from '@/services/subject-service';
import Loader from '@/components/Loader.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    Loader
  },
  data() {
    return {
      subjects: [],
      loading: true,
      showAddSubjectModal: false,
      showSubjectModal: false,
      showDeleteConfirm: false,
      selectedSubject: {},
      newSubject: {
        subject_name: '',
        subject_level: '',
        subject_lang: '',
        subject_desc: '',
        subject_type: '',
        subject_price: 6000 // Constans érték
      },
      showAlert: false,
      alertMessage: '',
    };
  },
  computed: {
    ...mapGetters(['isAuthor']),
    capitalizedSubjects() {
      return this.subjects.map(subject => ({
        ...subject,
        subject_name: this.capitalizeFirstLetter(subject.subject_name),
        subject_level: this.capitalizeFirstLetter(subject.subject_level),
        subject_lang: this.capitalizeFirstLetter(subject.subject_lang),
        subject_desc: this.capitalizeFirstLetter(subject.subject_desc),
        subject_type: this.capitalizeFirstLetter(subject.subject_type)
      }));
    }
  },
  methods: {
    capitalizeFirstLetter(string) {
      if (!string) return '';
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    async fetchSubjects() {
      try {
        const response = await getSubjects();
        this.subjects = response;
        this.loading = false;
      } catch (error) {
        console.error('Error fetching subjects:', error);
        this.loading = false;
      }
    },
    async addSubject() {
      const subjectData = {
        subject_name: this.newSubject.subject_name.toLowerCase(),
        subject_level: this.newSubject.subject_level.toLowerCase(),
        subject_lang: this.newSubject.subject_lang.toLowerCase(),
        subject_desc: this.newSubject.subject_desc, // Leírás marad eredeti formában
        subject_type: this.newSubject.subject_type.toLowerCase(),
        subject_price: this.newSubject.subject_price
      };

      try {
        await addSubject(subjectData);
        this.alertMessage = 'Tárgy sikeresen hozzáadva!';
        this.showAlert = true;
        this.closeAddSubjectModal();
        await this.fetchSubjects(); 
      } catch (error) {
        console.error('Hiba történt a tárgy hozzáadása során:', error);
        alert('Hiba történt a tárgy hozzáadása során.');
      }
    },
    openSubjectModal(subject) {
      this.selectedSubject = subject;
      this.showSubjectModal = true;
    },
    closeSubjectModal() {
      this.showSubjectModal = false;
      this.selectedSubject = {};
    },
    confirmDeleteSubject() {
      this.showSubjectModal = false;
      this.showDeleteConfirm = true;
    },
    closeDeleteConfirm() {
      this.showDeleteConfirm = false;
    },
    async deleteSubject() {
      try {
        await deleteSubject(this.selectedSubject.subject_id);
        this.alertMessage = 'Tárgy sikeresen törölve!';
        this.showAlert = true;
        this.closeDeleteConfirm();
        this.closeSubjectModal();
        await this.fetchSubjects(); 
      } catch (error) {
        console.error('Hiba történt a tárgy törlése során:', error);
        alert('Hiba történt a tárgy törlése során.');
      }
    },
    closeAddSubjectModal() {
      this.showAddSubjectModal = false;
      this.newSubject = {
        subject_name: '',
        subject_level: '',
        subject_lang: '',
        subject_desc: '',
        subject_type: '',
        subject_price: 6000 // Konstans érték
      };
    }
  },
  async mounted() {
    await this.fetchSubjects();
  }
};
</script>

<style scoped>
.subject-card {
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.subject-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
}

.modal-body {
  text-align: center; 
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
.alert {
  z-index: 1050;
  width: 70%;
  font-weight: bold;
  left: 50%;
  transform: translateX(-50%);
}
</style>