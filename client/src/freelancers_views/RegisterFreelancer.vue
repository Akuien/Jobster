<template>
  <div class="form">
    <div>
      <h1>Create your own profile</h1>
      <div class="section">
        <h3>Name:</h3>
        <div class="row">
          <div class="col">
            <input type="text" class="form-control" v-model="data.first_name" placeholder="First Name">
          </div>

          <div class="col">
            <input type="text" class="form-control" v-model="data.last_name" placeholder="Last Name">
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Description:</h3>
        <div class="row">
          <div class="col">
            <input type="text" class="form-control" v-model="data.description" placeholder="Description">
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Contact information:</h3>
        <div class="row">
          <div class="col">
            <input type="email" class="form-control" v-model="data.email_address" placeholder="Your E-Mail address">
          </div>

          <div class="col">
            <input type="text" class="form-control" v-model="data.phone_number" placeholder="Your phone number">
          </div>
        </div>

        <div class="section">
          <h3>Password:</h3>

          <div class="col">
            <input type="password" class="form-control" v-model="data.password" placeholder="Password">
          </div>
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
        })
    }
  }
}
</script>
