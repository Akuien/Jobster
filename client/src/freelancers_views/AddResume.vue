<template>
  <b-container>
    <div>
      <h1>Create resume</h1>
      <div class="section">
        <div class="row">
          <b-form-textarea type="text" class="form-control" v-model="data.education_field" placeholder="Education"></b-form-textarea>
          <b-form-textarea type="text" class="form-control" v-model="data.experience_field" placeholder="Experience"></b-form-textarea>
        </div>
      </div>
          <div class="col">
            <b-form-tags v-model="data.skills_field" placeholder="Add a skill tag and press enter"></b-form-tags>
          </div>
        <b-button type="submit" value="Create Resume" @click="createResume()">Create Resume</b-button>
      </div>
  </b-container>
</template>

<style scoped>
.form-control {
  margin-bottom: 50px;
}
h1 {
  margin-top: 30px;
}

@media screen and (max-width: 768px) {
  h1 {
    margin-bottom: 40px;
  }
  .form-control {
    width: 300px;
    margin: 0 auto;
    margin-bottom: 30px;
  }
}
</style>

<script>
import FreelancersOps from './FreelancersOps'

export default {
  name: 'resume',
  data() {
    return {
      data: {
        education_field: '',
        experience_field: '',
        skills_field: '',
        freelancer: this.$route.params.id
      }
    }
  },
  methods: {
    createResume() {
      FreelancersOps.createResume(this.$route.params.id, this.data)
        .then(() => {
          this.$toasted.show('Resume successfully created!')
          this.$router.push('/freelancers/' + this.$route.params.id + '/resumes')
        })
        .catch(error => {
          this.$toasted.show(error)
          this.$toasted.show('Please enter all the fields!')
        })
    }
  }
}
</script>
