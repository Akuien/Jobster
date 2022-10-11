<template>
<div>
   <b-row>
        <div v-for="job_post in job_posts" v-bind:key="job_post._id">
            <b-card style="height: 20rem;width: 20rem; background-color: lightgrey; padding: 80px; margin-top: 20px; margin-left: 50px; margin-bottom: 20px; position:relative">
            <h3>{{job_post.job_title}}</h3>
                <b-card-text>{{job_post.post_date}}</b-card-text>
            </b-card>
        </div>
    </b-row>
</div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'job_post',

  mounted() {
    this.getJobPost(this.$route.params.id)
  },
  data() {
    return {
      job_post: null
    }
  },
  methods: {
    getJobPost(id) {
      Api.get('/job_posts/' + id)
        .then(response => {
          this.job_post = response.data
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
