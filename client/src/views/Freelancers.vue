<template>
    <div>
        <div v-for="freelancer in freelancers" v-bind:key="freelancer._id">
            <b-card style="max-width: 20rem; background-color: lightgrey; padding: 30px; margin-top: 20px; margin-left: 20px;">
                <h2>{{freelancer.first_name}}</h2>
                <p>{{freelancer.description}}</p>
            </b-card>
        </div>
    </div>
</template>

<script>
import freelancerOps from '../FreelancersOps'

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
      freelancerOps.getFreelancers()
        .then(response => {
          this.freelancers = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
