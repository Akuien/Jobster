<template>
    <b-row>
        <div v-for="freelancer in freelancers" v-bind:key="freelancer._id">
            <b-card v-flex auto class="px-10" style="height: 20rem;width: 20rem; background-color: lightgrey; padding: 80px; margin-top: 20px; margin-left: 50px; margin-bottom: 20px">
                <h2>{{freelancer.first_name}}</h2>
                <p>{{freelancer.description}}</p>
                <b-button style="background-color: grey;" :href="'/freelancers/' + freelancer._id">Read more</b-button>
            </b-card>
        </div>
    </b-row>
</template>

<script>
import FreelancersOps from '../FreelancersOps'

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
          console.log(error)
        })
    }
  }
}
</script>
