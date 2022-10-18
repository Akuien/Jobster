<template>
  <div>
    <div>
      <b-button v-b-modal.modal-1 id="modal_button">Create new job post</b-button>
        <b-modal id="modal-1" title="Create new job post" @ok="createJob()">
          <h5>Job Title</h5>
          <b-form-input type="text" class="form-control" v-model="body.job_title" placeholder="Enter job title"></b-form-input>
          <h5>Description</h5>
          <b-form-textarea type="text" class="form-control" v-model="body.description" placeholder="Enter job description" maxlength="450"></b-form-textarea>
          <h5>Post Date</h5>
          <b-form-input type="date" class="form-control" v-model="body.post_date" placeholder="Enter post date"></b-form-input>
          <h5>Deadline</h5>
          <b-form-input type="date" class="form-control" v-model="body.deadline" placeholder="Enter deadline for the job post"></b-form-input>
        </b-modal>
    </div>
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
  </div>
</template>

<script>
import CompaniesOps from './CompaniesOps'
import { Api } from '@/Api'

export default {
  name: 'jobs',
  data() {
    return {
      jobs: [],
      body: {
        job_title: '',
        deadline: Date,
        post_date: Date,
        description: '',
        company: this.$route.params.id
      }
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
    },
    createJob() {
      Api.post('/companies/' + this.$route.params.id + '/job_posts', this.body)// used this method because post from CompaniesOps doesnt work
        .then(() => {
          this.$toasted.show('Job successfully created!')
          window.location.reload()
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

  #modal_button {
    margin-top: 2rem;
  }

  .form-control {
    margin-bottom: 2rem;
  }

  img {
    height: 12rem;
    width: 100%;
  }
    .card {
    height: 25rem;
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
