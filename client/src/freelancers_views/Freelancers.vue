<template>
    <b-row>
        <div v-for="freelancer in freelancers" v-bind:key="freelancer._id">
            <b-card class="card">
              <div>
                <h4 class="first_name">{{freelancer.first_name}} {{freelancer.last_name}}</h4>
              </div>
                  <b-card-text class="card_text">{{freelancer.description}}</b-card-text>
                <div class="button_container">
                  <b-button class="readmore_button" :href="'/freelancers/' + freelancer._id">Read more</b-button>
                </div>
                <div>
                <b-button class="delete_button" @click="deleteFreelancer(freelancer._id)">Delete</b-button>
              </div>
            </b-card>
        </div>
    </b-row>
</template>

<style scoped>
  .card_text {
    position: absolute;
    margin-right: 80px;
    margin-top: 90px;
    width: 200px;
    display: flex;
  }
  .first_name {
    margin-bottom: 50px;
    position: absolute;
    margin-right: 80px;
  }
  .delete_button {
    position: absolute;
    background-color: red;
    margin-top: 20px;
    display: flex;
    margin-left: 35px;
  }
  .button_container {
    position: relative;
    margin: auto;
  }

  .card {
    height: 26rem;
    width: 20rem;
    background-color: lightgray;
    padding: 70px;
    margin-top: 40px;
    margin-left: 80px;
    margin-bottom: 20px;
  }

  .readmore_button {
    background-color: grey;
    margin-top: 200px;
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
