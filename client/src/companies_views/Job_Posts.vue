<template>
    <b-row>
        <div v-for="job in jobs" v-bind:key="job._id">
          <b-col fluid="md">
            <div class="card">
              <img src="https://visaguideinfo.com/wp-content/uploads/2020/02/0.jpg" class="card-img-top" alt="company_pic">
              <div class="card-body">
                <h2 class="card-title">{{job.job_title}}</h2>
                <p class="card-text"> Post date: {{job.post_date.substring(0,10)}}</p>
                <b-button class="read_more" style="background-color: grey;" :href="'/job_posts/' + job._id">Read more</b-button>
              </div>
            </div>
          </b-col>
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
        })
        .catch(error => {
          this.$toasted.show(error)
        })
    }
  },
  mounted() {
    this.getJobs(this.$route.params.id)
  }
}
</script>

<style scoped>
  img {
    height: 12rem;
    width: 100%;
  }
    .card {
    max-height: 30rem;
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
   @media screen and (max-width: 768px) {
   .card {
     margin-left: 10%;
    }
 }
 .read_more {
  background-color: rgb(125, 92, 175);
}
.read_more:hover {
    background-color: rgb(123, 77, 192);
}
</style>
