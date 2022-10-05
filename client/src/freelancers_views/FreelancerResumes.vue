<template>
    <b-row>
        <div v-for="resume in resumes" v-bind:key="resume._id">
            <b-card style="height: 20rem;width: 20rem; background-color: lightgrey; padding: 80px; margin-top: 20px; margin-left: 50px; margin-bottom: 20px; position:relative">
                <h3>Skills: {{resume.skills_field}}</h3>
                <b-card-text>Experience: {{resume.experience_field}}</b-card-text>
            </b-card>
        </div>
    </b-row>
</template>

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
          console.log(error)
        })
    }
  },
  mounted() {
    this.getResumes(this.$route.params.id)
  }
}
</script>
