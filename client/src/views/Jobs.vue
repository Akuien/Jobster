<template>
  <div>
      <b-button id="delete_jobs_button" @click="deleteJobs()">Delete Jobs</b-button>
      <b-row>
            <div v-for="job_post in job_posts" v-bind:key="job_post._id">
              <b-col fluid="md">
                <div class="card">
                  <img src="https://visaguideinfo.com/wp-content/uploads/2020/02/0.jpg" class="card-img-top" alt="company_pic">
                  <div class="card-body">
                    <h2 class="card-title">{{job_post.job_title}}</h2>
                    <p class="card-text">Post Date: {{job_post.post_date.substring(0,10)}}</p>
                    <p class="card-text">Deadline: {{job_post.deadline.substring(0,10)}}</p>
                    <b-button class="read_more" style="background-color: grey;" :href="'/job_posts/' + job_post._id">Read more</b-button>
                  </div>
                </div>
              </b-col>
            </div>
        </b-row>
      </div>
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

#delete_jobs_button {
  margin-top: 2rem;
}

.read_more {
  background-color: rgb(125, 92, 175);
}
  img {
    height: 12rem;
    width: 100%;
  }
  .card {
    height: 26rem;
    width: 20rem;
    background-color: #d5d7e0;
    color: rgb(75, 71, 71);
    margin-top: 40px;
    margin-left: 50px;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0px 8px 15px -7px gray;
    position: relative;
    text-align: center;
    transition: ease-in-out 0.35s;
}

.card_text {
  font-size: 15px;
  line-height: 21px;
  color: #4D648D;
  margin-top: 20px;
}

.card:hover {
  transform: scale(1.10);
  box-shadow: 10px 10px 15px -7px gray;
}

.read_more:hover {
  background-color: rgb(123, 77, 192);
}
 @media screen and (max-width: 768px) {
   .card {
     margin-left: 10%;
    }
 }
</style>
