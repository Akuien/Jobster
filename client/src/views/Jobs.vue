<template>
    <div>
        <p>This should display all the jobs posted </p>
    </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'Jobs',

  data() {
    return {
      jobs: ''
    }
  },
  methods: {
    getJobPosts() {
      Api.get('/job_posts')
        .then(response => {
          this.jobs = response.data.jobs
        })
    }
  }
}
</script>

<style scoped>

</style>
