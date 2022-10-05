<template>
    <div>
        <div v-for="job in jobs" v-bind:key="job._id">
          <h1>{{job.company_name}}</h1>
          <h2>{{job.description}}</h2>
          <b-button style="background-color: grey;" :href="'/companies/' + company._id + '/job_posts'">Check out jobs</b-button>
        </div>
    </div>
</template>

<script>
import CompaniesOps from './CompaniesOps'

export default {
  name: 'jobs',
  data() {
    return {
      jobs: null
    }
  },
  methods: {
    getJobs(id) {
      CompaniesOps.getAllJobs(id)
        .then(response => {
          this.jobs = response.data
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
