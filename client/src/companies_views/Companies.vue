<template>
    <b-row>
        <div v-for="company in companies" v-bind:key="company._id">
          <b-col fluid="md">
            <div class="card">
              <img src="https://jooinn.com/images/buildings-36.jpg" class="card-img-top" alt="company_pic">
              <div class="card-body">
                <h2 class="card-title">{{company.company_name}}</h2>
                <p class="card-text">{{company.company_email}}</p>
                <b-button class="read_more" :href="'/companies/' + company._id">Read more</b-button>
              </div>
            </div>
          </b-col>
        </div>
    </b-row>
</template>

<style scoped>

.read_more {
  background-color: rgb(125, 92, 175);
}

  img {
    height: 12rem;
    width: 100%;
  }

.card {
    height: 23rem;
    width: 20rem;
    background-color: #d5d7e0;
    color: rgb(75, 71, 71);
    margin-top: 40px;
    margin-left: 50px;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0px 8px 15px -7px gray;
    position: relative;
    text-align: center;
    transition: ease-in-out 0.35s;
}

.card_text {
  font-size: 15px;
  line-height: 21px;
  color: #4D648D;
  margin-top: 20px;
}

 .card:hover {
     transform: scale(1.10);
     box-shadow: 10px 10px 15px -7px gray;
  }

.read_more:hover {
    background-color: rgb(123, 77, 192);
}

 @media screen and (max-width: 768px) {
   .card {
     margin-left: 10%;
    }
 }

</style>

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
          this.$toasted.show(error)
        })
    }
  }
}
</script>
