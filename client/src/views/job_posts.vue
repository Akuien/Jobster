<template>
    <b-container>
      <div v-for="attribute in job_post" v-bind:key="attribute._id" id="job_post">
        <b-card-text>
          <h1>Job wanted:</h1>
          <p>{{attribute.description}}</p>
          <p>Posted at: {{attribute.post_date}}</p>
          <p>Deadline: {{attribute.deadline}}</p>

          <button type="button" class="btn btn-primary" @click="apply">Apply</button>
        </b-card-text>
      </div>
    </b-container>
</template>

<style>
#job_post {
  margin-top: 10%;
  padding: 2em;
}

h1 {
  font-size: 5em;
}

p {
  font-size: 1.25em;
}
</style>

<script>
import { Api } from '@/Api'

export default {
  name: 'job_post',

  mounted() {
    this.getJobPost(this.$route.params.id)
  },
  data() {
    return {
      job_post: null,
      body: {
        job_title: this.job_title,
        job_description: this.job_description,
        post_date: this.post_date
      }
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
    },

    apply() {
      alert("Applied succesfully");
      window.location.href = "/jobs"
    }
  }
}
</script>

<style scoped>

</style>
