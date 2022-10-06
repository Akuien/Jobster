<template>
    <b-row>
        <div v-for="job in jobs" v-bind:key="job._id">
          <b-card style="height: 20rem;width: 20rem; background-color: lightgrey; padding: 80px; margin-top: 20px; margin-left: 50px; margin-bottom: 20px; position:relative">
                <h1>{{job.job_title}}</h1>
                <b-card-text>{{job.description}}</b-card-text>
          </b-card>
        </div>
    </b-row>
</template>

<script>
import CompaniesOps from './CompaniesOps'

export default {
  name: 'jobs',
  data() {
    return {
      jobs: []
    }
  },
  methods: {
    getJobs(id) {
      CompaniesOps.getAllJobs(id)
        .then(response => {
          this.jobs = response.data
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted() {
    this.getJobs(this.$route.params.id)
  }
}
</script>
