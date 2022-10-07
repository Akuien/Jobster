<template>
<div>
  <div>
        <div>
  <b-navbar type="light" variant="light">
    <b-nav-form>
      <b-form-input class="mr-sm-2" placeholder="Search"></b-form-input>
      <b-button variant="outline-success" class="my-2 my-sm-0" type="submit">Search</b-button>
    </b-nav-form>
  </b-navbar>
</div>
  </div>
  <div>
<b-container>
  <b-row align-v="center">
    <job-Card></job-Card>
    <job-Card></job-Card>
    <job-Card></job-Card>
    <job-Card></job-Card>
    <job-Card></job-Card>
  </b-row>
        <b-pagination
        v-model="currentPage"
        :total-rows="getRows"
        :per-page="perPage"
        first-text="First"
        prev-text="Prev"
        next-text="Next"
        last-text="Last"
        @input="paginate(currentPage)"
      ></b-pagination>
</b-container>
  </div>
</div>
</template>

<script>
import { Api } from '@/Api'
import jobCard from '../components/jobCard'

export default {
  name: 'job_posts',
  components: { 'job-Card': jobCard },

  mounted() {
    this.getJobs()
  },
  data() {
    return {
      job_posts: []
    }
  },
  methods: {
    getJobs() {
      Api.get('/job_posts')
        .then(response => {
          this.job_posts = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
