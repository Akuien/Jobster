<template>
    <b-row>
        <div v-for="freelancer in freelancers" v-bind:key="freelancer._id">
            <b-card style="height: 20rem;width: 20rem; background-color: lightgrey; padding: 80px; margin-top: 20px; margin-left: 50px; margin-bottom: 20px; position:relative">
                <b-button style="margin-left: 7em;position:absolute" @click="deleteFreelancer(freelancer._id)">X</b-button>
                <h3>{{freelancer.first_name}}</h3>
                <b-card-text>{{freelancer.description}}</b-card-text>
                <b-button style="background-color: grey;" :href="'/freelancers/' + freelancer._id">Read more</b-button>
            </b-card>
        </div>
    </b-row>
</template>

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
