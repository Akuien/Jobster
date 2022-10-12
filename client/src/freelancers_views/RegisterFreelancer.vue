<template>
  <div class="form">
    <div>
      <h1>Create your own profile</h1>
      <div class="section">
        <h3 class="name_title">Name:</h3>
        <b-form-row>
          <div class="col">
            <input type="text" id="first_name" class="form-control" v-model="data.first_name" placeholder="First Name">
          </div>

          <div class="col">
            <input type="text" id="last_name" class="form-control" v-model="data.last_name" placeholder="Last Name">
          </div>
        </b-form-row>
      </div>

      <div class="section">
        <h3 class="description_title">Description:</h3>
        <div class="row">
          <div class="col">
            <b-form-textarea type="text" id="description" class="form-control" v-model="data.description" placeholder="Write a short description. Max amount of characters: 80" rows="5" max-rows="8" maxlength="80"></b-form-textarea>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Contact information:</h3>
        <div class="row">
          <div class="col">
            <input type="email" id="email_address" class="form-control" v-model="data.email_address" placeholder="Your E-Mail address">
          </div>

          <div class="col">
            <input type="text" id="phone_number" class="form-control" v-model="data.phone_number" placeholder="Your phone number">
          </div>
        </div>

        <div class="section">
          <h3 class="pass_title">Password:</h3>

            <input type="password" id="password" class="form-control" v-model="data.password" placeholder="Password">
        </div>

        <input type="submit" value="Register" @click="createFreelancer()">
      </div>
    </div>
  </div>
</template>

<style>
  .section {
    padding: 2em;
  }

  .form, #form {
    margin: auto;
    padding: 10px;
    width: 50%;
  }
  h3 {
  color: gray;
}
  @media screen and (max-width: 768px) {
      .section {
        padding: 0em;
      }

      #first_name {
        width: 200px;
      }
      #last_name {
        width: 200px;
        margin-top: 20px;
        margin-bottom: 30px;
      }
      #description {
        width: 200px;
        margin-bottom: 30px;
      }
      #email_address {
        width: 200px;
        margin-bottom: 30px;
        margin-top: 20px;
      }
      #phone_number {
        width: 200px;
        margin-bottom: 30px;
      }
      #password {
        width: 200px;
        margin-bottom: 30px;
      }
  }
</style>

<script>
import FreelancersOps from './FreelancersOps'

export default {
  name: 'registration',
  data() {
    return {
      data: {
        first_name: '',
        last_name: '',
        description: '',
        email_address: '',
        phone_number: '',
        password: ''
      }
    }
  },
  methods: {
    createFreelancer() {
      FreelancersOps.createOneFreelancer(this.data)
        .then(() => {
          this.$toasted.show('Account created successfully!')
          this.$router.push('/')
        })
        .catch(error => {
          this.$toasted.show(error)
          this.$toasted.show('Please enter all the fields!')
        })
    }
  }
}
</script>
