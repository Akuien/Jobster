<template>
   <b-row>
        <div v-for="job_post in job_posts" v-bind:key="job_post._id">
            <b-card style="height: 20rem;width: 20rem; background-color: lightgrey; padding: 80px; margin-top: 20px; margin-left: 50px; margin-bottom: 20px; position:relative">
            <h3>{{job_post.job_title}}</h3>
                <b-card-text>{{job_post.post_date}}</b-card-text>
                <b-card-text>{{job_post.deadline}}</b-card-text>
                <b-button style="background-color: grey;" :href="'/job_posts/' + job_post._id">Read more</b-button>
            </b-card>
        </div>
    </b-row>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'job_posts',

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
