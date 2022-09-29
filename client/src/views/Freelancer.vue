<template>
    <div>
        <div v-for="attribute in freelancer" v-bind:key="attribute._id">
          <h1>{{attribute.first_name}} {{attribute.last_name}}</h1>
          <h2>{{attribute.email_address}}</h2>
          <p>{{attribute.description}}</p>
        </div>
    </div>
</template>

<script>
import FreelancersOps from '../FreelancersOps'

export default {
  name: 'freelancer',
  data() {
    return {
      freelancer: null
    }
  },
  methods: {
    getFreelancer(id) {
      FreelancersOps.getOneFreelancer(id)
        .then(response => {
          this.freelancer = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted() {
    this.getFreelancer(this.$route.params.id)
  }
}
</script>
