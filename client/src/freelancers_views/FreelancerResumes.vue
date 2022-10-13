<template>
    <b-container fluid="md">
        <div v-for="resume in resumes" v-bind:key="resume._id">
            <b-card id="card">
              <h4>Experience: </h4>
              <b-card-text class="card_text">{{resume.experience_field}}</b-card-text>
              <h4>Education: </h4>
              <b-card-text class="card_text">{{resume.education_field}}</b-card-text>
              <h4>Skills: </h4>
              <div id="tag_container">
                <b-row>
                  <div v-for="skill in resume.skills_field" v-bind:key="skill">
                      <b-button id="tag">{{skill}}</b-button>
                  </div>
                </b-row>
              </div>
              <b-button id="delete_button" @click="deleteResume(resume.freelancer, resume._id)">Delete</b-button>
            </b-card>
        </div>
        <div style="padding:160px">
            <b-button id="add_button" :href="'/freelancers/' + this.$route.params.id + '/resumes/create_resume'">Add Resume</b-button>
        </div>
    </b-container>
</template>

<style scoped>

#delete_button {
  border-radius: 5px;
  background-color: #2c384b;
  margin-top: 30px;
  margin-bottom: 15px;
}

#add_button {
height: 80px;
width: 80px;
border-radius: 30pt;
background-color: #8f97a1;
transition: ease-in-out 0.35s;
}
#add_button:hover {
  transform: scale(1.03);
}

#tag_container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}
#tag {
  border-radius: 30px;
  background-color: rgb(159, 124, 253);
  font-size: 12px;
  margin-left: 4px;
}
h4 {
  margin-top: 30px;
  margin-bottom: 20px;
  color: #2c384b;
}
.card_text {
  font-size: 15px;
  line-height: 30px;
  margin-top: 20px;
}
#card {
  max-height: 70rem;
  background-color: #c2cbd8;
  padding: 10px;
  margin-top: 40px;
  margin-left: 80px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0px 8px 15px -7px gray;
  position: relative;
  text-align: center;
  transition: ease-in-out 0.35s;
}
#card:hover{
    transform: scale(1.03);
    box-shadow: 10px 10px 15px -7px gray;
    color: black;
}

@media screen and (min-width: 768px) {
  #card {
    max-height: 70rem;
    width: 100%;
    margin-left: 10px;
  }
}

@media screen and (max-width: 768px) {
  #card {
    max-height: 70rem;
    width: 95%;
    margin-left: 10px;
  }
  #add_button {
    margin-right: 80px;
  }

}
</style>

<script>
import FreelancersOps from './FreelancersOps'

export default {
  name: 'resumes',
  data() {
    return {
      resumes: []
    }
  },
  methods: {
    getResumes(id) {
      FreelancersOps.getResumes(id)
        .then(response => {
          this.resumes = response.data
        })
        .catch(error => {
          this.$toasted.show(error)
        })
    },
    deleteResume(freelancerId, resumeId) {
      FreelancersOps.deleteResume(freelancerId, resumeId)
        .then(() => {
          this.$toasted.show('Resume successfully deleted')
          const index = this.resumes.findIndex(resume => resume._id === resumeId)
          this.resumes.splice(index, 1)
        })
        .catch(error => {
          this.$toasted.show(error)
        })
    }
  },
  mounted() {
    this.getResumes(this.$route.params.id)
  }
}
</script>
