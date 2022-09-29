<template>
    <b-row>
        <div v-for="company in companies" v-bind:key="company._id">
            <b-card style="height: 20rem;width: 20rem; background-color: lightgrey; padding: 80px; margin-top: 20px; margin-left: 50px; margin-bottom: 20px;">
                <h2>{{company.company_name}}</h2>
                <p>{{company.company_description}}</p>
                <b-button style="background-color: grey;" :href="'/companies/' + company._id">Read more</b-button>
            </b-card>
        </div>
    </b-row>
</template>

<script>
import CompaniesOps from './CompaniesOps'

export default {
  name: 'companies',
  mounted() {
    this.getAllCompanies()
  },
  data() {
    return {
      companies: []
    }
  },
  methods: {
    getAllCompanies() {
      CompaniesOps.getCompanies()
        .then(response => {
          this.companies = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>