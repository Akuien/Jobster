<template>
    <b-row>
        <div v-for="freelancer in freelancers" v-bind:key="freelancer._id">
          <b-col fluid="md">
            <b-card id="card">
              <img src="https://bodhicounseling.com/wp-content/uploads/2018/05/blank-profile-picture-973460_960_720-150x150.png" alt="profile_pic" />
              <h5 class="first_name">{{freelancer.first_name}} {{freelancer.last_name}}</h5>
              <b-card-text class="card_text">{{freelancer.description}}</b-card-text>
                <div class="button_container">
                <b-button class="readmore_button" :href="'/freelancers/' + freelancer._id">Read more</b-button>
                <b-button class="delete_button" @click="deleteFreelancer(freelancer._id)">Delete</b-button>
              </div>
            </b-card>
          </b-col>
        </div>
    </b-row>
</template>

<style scoped>

  img {
    border-radius: 50%;
    height: 120px;
    width: 120px;
  }
  h5 {
    margin: 10px;
    color: #283655;
  }
  .card_text {
    font-size: 15px;
    line-height: 21px;
    color: #4D648D;
    margin-top: 20px;
  }
  .delete_button {
    background-color: rgb(218, 68, 68);
    margin-left: 10px;
  }
  .button_container {
    padding: 10px;
  }
  #card {
    height: 23rem;
    width: 20rem;
    background-color: #eceff2;
    padding: 10px;
    margin-top: 40px;
    margin-left: 30px;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0px 8px 15px -7px gray;
    position: relative;
    text-align: center;
    transition: ease-in-out 0.35s;
  }
  .card:hover{
     transform: scale(1.10);
     box-shadow: 10px 10px 15px -7px gray;
  }
  .readmore_button {
    background-color: #8d8b8b;
  }
  @media screen and (max-width: 768px) {
   .card {
     margin-right: 2rem;
     margin-left: 1rem;
    }
}
</style>

<script>
import FreelancersOps from './FreelancersOps'

export default {
  name: 'freelancers',
  mounted() {
    this.getAllFreelancers()
  },
  data() {
    return {
      freelancers: []
    }
  },
  methods: {
    getAllFreelancers() {
      FreelancersOps.getFreelancers()
        .then(response => {
          this.freelancers = response.data
        })
        .catch(error => {
          this.$toasted.show(error)
        })
    },
    deleteFreelancer(id) {
      FreelancersOps.deleteFreelancer(id)
        .then(() => {
          this.$toasted.show('Freelancer successfully deleted')
          const index = this.freelancers.findIndex(freelancer => freelancer._id === id)
          this.freelancers.splice(index, 1)
        })
        .catch(error => {
          this.$toasted.show(error)
        })
    }
  }
}
</script>
