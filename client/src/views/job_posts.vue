<template>
    <b-container fluid="md">
      <div v-for="attribute in job_post" v-bind:key="attribute._id" id="job_post">
        <b-card id="card">
        <h1><p>{{attribute.job_title}}</p></h1>
        <b-card-text class="card_text">{{attribute.description}}</b-card-text>
        <b-card-text class="card_text">{{attribute.post_date}}</b-card-text>
        <b-card-text class="card_text">{{attribute.deadline}}</b-card-text>
        <b-card-text>

          <button type="button" class="btn btn-primary" @click="apply">Apply</button>
        </b-card-text>
         </b-card>
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
      alert('Applied succesfully')
      window.location.href = '/jobs'
    }
  }
}
</script>

<style scoped>
#tag_container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}
#tag {
  border-radius: 30px;
  background-color: rgb(159, 124, 253);
  font-size: 12px;
  margin-left: 4px;
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
  max-height: 70rem;
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
@media screen and (min-width: 768px) {
  #card {
    max-height: 70rem;
    width: 100%;
    margin-left: 10px;
  }
}
@media screen and (max-width: 768px) {
  #card {
    max-height: 70rem;
    width: 95%;
    margin-left: 10px;
  }
  #add_button {
    margin-right: 80px;
  }

}
</style>
