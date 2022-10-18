<template>
    <b-container fluid="md">
      <div v-for="attribute in job_post" v-bind:key="attribute._id" id="job_post">
        <b-card id="card">
        <h1><p>{{attribute.job_title}}</p></h1>
        <b-card-text class="card_text">{{attribute.description}}</b-card-text>
        <b-card-text class="card_text">Post date: {{attribute.post_date.substring(0,10)}}</b-card-text>
        <b-card-text class="card_text">Display Until: {{attribute.deadline.substring(0,10)}}</b-card-text>
        <b-card-text>
          <button type="button" class="btn btn-primary" @click="apply">Apply</button>
        </b-card-text>
         </b-card>
         <button type="button" class="btn btn-primary" v-on:click="isInvisible = !isInvisible">Rewrite job</button>
         <h5 v-if="!isInvisible">Job Title</h5>
         <b-row>
          <b-col>
            <b-form-input v-if="!isInvisible" type="text" class="form-control" v-model="body.job_title" placeholder="Change job title"></b-form-input>
          </b-col>
        </b-row>
        <h5 v-if="!isInvisible">Job Deadline</h5>
        <b-row>
          <b-col>
            <b-form-input v-if="!isInvisible" type="date" class="form-control" v-model="body.deadline" placeholder="Enter the job deadline, in YYYY-MM-DD format"></b-form-input>
          </b-col>
        </b-row>
        <h5 v-if="!isInvisible">Job Description</h5>
        <b-row>
            <b-col>
              <b-form-textarea rows="5" max-rows="8" v-if="!isInvisible" type="text" class="form-control" v-model="body.description" placeholder="Change description" maxlength="450"></b-form-textarea>
            </b-col>
        </b-row>
        <h5 v-if="!isInvisible">Job Post Date</h5>
        <b-row>
            <b-col>
              <b-form-input v-if="!isInvisible" type="date" class="form-control" v-model="body.post_date" placeholder="Enter the post date, in YYYY-MM-DD format"></b-form-input>
            </b-col>
        </b-row>
        <div style="padding:5em">
        <b-button id="save_button" v-if="!isInvisible" @click="updateJobPost()">Save changes</b-button>
        </div>
      </div>
    </b-container>
</template>

<style scoped>

.col {
  margin-top: 30px;
  justify-content: center;
  display: flex;
}

.btn {
  margin-top: 3rem;
  margin-bottom: 3rem;
}

h1 {
  margin-top: 30px;
  margin-bottom: 20px;
  color: #2c384b;
}
.card_text {
  font-size: 15px;
  line-height: 30px;
  margin-top: 20px;
}
#card {
  height: 50rem;
  background-color: #c2cbd8;
  padding: 10px;
  margin-top: 40px;
  margin-left: 80px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0px 8px 15px -7px gray;
  position: relative;
  text-align: center;
  transition: ease-in-out 0.35s;
}
#card:hover{
    transform: scale(1.03);
    box-shadow: 10px 10px 15px -7px gray;
    color: black;
}
h5 {
  margin-top: 2rem;
}
@media screen and (min-width: 768px) {
  #card {
    max-height: 120rem;
    width: 100%;
    margin-left: 10px;
  }
}
@media screen and (max-width: 768px) {
  #card {
    max-height: 80rem;
    width: 95%;
    margin-left: 10px;
  }
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
      isInvisible: true,
      job_post: null,
      body: {
        job_title: this.job_title,
        deadline: this.deadline,
        description: this.description,
        post_date: this.post_date,
        company: this.company
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
    updateJobPost() {
      Api.put('/job_posts/' + this.$route.params.id, this.body)
        .then(() => {
          this.$toasted.show('Job has been successfully updated!')
          window.location.reload()
        })
        .catch(error => {
          this.$toasted.show(error)
        })
    },
    apply() {
      alert('Applied succesfully')
      window.location.href = '/jobs'
    }
  }
}
</script>
