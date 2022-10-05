<template>
    <div>
        <div v-for="attribute in company" v-bind:key="attribute._id">
          <h1>{{attribute.company_name}}</h1>
          <h2>{{attribute.company_email}}</h2>
          <b-button style="background-color: grey;" :href="'/companies/' + company._id + '/job_posts'">Check out jobs</b-button>
        </div>
    </div>
</template>

<script>
import CompaniesOps from './CompaniesOps'

export default {
  name: 'company',
  data() {
    return {
      company: null
    }
  },
  methods: {
    getCompany(id) {
      CompaniesOps.getOneCompany(id)
        .then(response => {
          this.company = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted() {
    this.getCompany(this.$route.params.id)
  }
}
</script>
