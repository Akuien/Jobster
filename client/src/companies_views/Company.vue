<template>
    <div>
        <div v-for="attribute in company" v-bind:key="attribute._id">
            <b-card id="card" no-body class="overflow-hidden" style="max-width: 1200px;">
              <b-row no-gutters>
                <b-col md="6">
                  <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="rounded-0"></b-card-img>
                </b-col>
                <b-col md="6">
                  <b-card-body>
                    <b-card-text><h1>{{attribute.company_name}}</h1></b-card-text>
                    <h4>Description: </h4>
                    <b-card-text>{{attribute.company_description}}</b-card-text>
                    <h4>Contact Details: </h4>
                    <b-card-text>{{attribute.company_email}}</b-card-text>
                    <b-card-text>{{attribute.company_phone}}</b-card-text>
                    <h4>Address: </h4>
                    <b-card-text>{{attribute.company_location}}</b-card-text>
                  </b-card-body>
                </b-col>
              </b-row>
              <b-button  class="pb-2" size="sm" style="background-color: grey;" :href="'/companies/' + attribute._id + '/job_posts'">Check out jobs</b-button>
            </b-card>
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
          this.$toasted.show(error)
        })
    }
  },
  mounted() {
    this.getCompany(this.$route.params.id)
  }
}
</script>

<style scoped>
h4 {
  margin-top: 30px;
  margin-bottom: 20px;
  color: #2c384b;
}
.card_text {
  font-size: 15px;
  line-height: 30px;
  margin-top: 20px;
}
#card:hover{
    transform: scale(1.03);
    box-shadow: 10px 10px 15px -7px gray;
    color: black;
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
  text-align: center;
  transition: ease-in-out 0.35s;
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
}
</style>
