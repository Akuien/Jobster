<template>
<div>

  <div>
  <b-navbar type="light" variant="light">
    <b-nav-form>
      <b-form-input class="mr-sm-2" placeholder="Search"></b-form-input>
      <b-button variant="outline-success" class="my-2 my-sm-0" type="submit">Search</b-button>
    </b-nav-form>
  </b-navbar>
</div>
<div>
  <b-button id="delete_jobs_button" @click="deleteJobs()">Delete Jobs</b-button>
   <b-row>
        <div v-for="job_post in job_posts" v-bind:key="job_post._id">
            <b-card style="height: 20rem;width: 20rem; background-color: lightgrey; padding: 80px; margin-top: 20px; margin-left: 50px; margin-bottom: 20px; position:relative">
            <h3>{{job_post.job_title}}</h3>
                <b-card-text>{{job_post.post_date}}</b-card-text>
                <b-button style="background-color: grey;" :href="'/job_posts/' + job_post._id">Read more</b-button>
            </b-card>
        </div>
    </b-row>
</div>

</div>
</template>

<style scoped>
  #delete_jobs_button {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
</style>

<script>
import { Api } from '@/Api'

export default {
  name: 'job_posts',

  mounted() {
    this.getJobs()
  },
  data() {
    return {
      job_posts: [],
      jobPost: null,
      isInVisible: true,
      body: {
        job_title: this.job_title,
        deadline: this.deadline,
        post_date: this.post_date,
        description: this.description,
        company: this.company
      }
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
    },
    deleteJobs() {
      Api.delete('/job_posts')
        .then(() => {
          this.$toasted.show('Job posts successfully deleted!')
        })
        .catch(error => {
          this.$toasted.show(error)
          this.$toasted.show('Could not delete all job posts')
        })
    }
  }
}
</script>

<style scoped>

</style>
