<template>
  <div class="form">
    <div>
      <h1>Create resume</h1>
      <div class="section">
        <div class="row">
          <div class="col">
            <input type="text" class="form-control" v-model="data.education_field" placeholder="Education">
          </div>

          <div class="col">
            <input type="text" class="form-control" v-model="data.experience_field" placeholder="Experience">
          </div>
        </div>
      </div>

      <div class="section">
        <div class="row">
          <div class="col">
            <input type="text" class="form-control" v-model="data.skills_field" placeholder="Skills">
          </div>
        </div>
      </div>

        <input type="submit" value="Create Resume" @click="createResume()">
      </div>
    </div>
</template>

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
          this.$router.push('/freelancers/' + this.$route.params.id + '/resumes')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
