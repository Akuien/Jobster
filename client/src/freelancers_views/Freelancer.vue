<template>
    <div>
        <div v-for="attribute in freelancer" v-bind:key="attribute._id">
          <h1>{{attribute.first_name}} {{attribute.last_name}}</h1>
          <h2>{{attribute.email_address}}</h2>
          <p>{{attribute.description}}</p>
        </div>
        <b-button v-on:click="isInvisible = !isInvisible">Edit profile</b-button>
        <div class="row">
          <div style="padding:5em;width:2em" class="col">
            <input v-if="!isInvisible" type="text" class="form-control" v-model="body.first_name" placeholder="Change First Name">
          </div>
          <div style="padding:5em;width:2em" class="col">
            <input v-if="!isInvisible" type="text" class="form-control" v-model="body.last_name" placeholder="Change Last Name">
          </div>
        </div>
        <div class="row">
            <div style="padding:5em;width:2em" class="col">
              <input v-if="!isInvisible" type="text" class="form-control" v-model="body.description" placeholder="Change description">
            </div>
        </div>
        <div class="row">
            <div style="padding:5em;width:2em" class="col">
              <input v-if="!isInvisible" type="text" class="form-control" v-model="body.email_address" placeholder="Change email address">
            </div>
        </div>
        <div class="row">
            <div style="padding:5em;width:2em" class="col">
              <input v-if="!isInvisible" type="text" class="form-control" v-model="body.phone_number" placeholder="Change phone number">
            </div>
        </div>
        <div class="row">
            <div style="padding:5em;width:2em" class="col">
              <input v-if="!isInvisible" type="password" class="form-control" v-model="body.password" placeholder="Change password">
            </div>
        </div>
        <div style="padding:5em">
        <b-button v-if="!isInvisible" @click="updateFreelancer()">Save changes</b-button>
        </div>
    </div>
</template>

<script>
import FreelancersOps from './FreelancersOps'

export default {
  name: 'freelancer',
  data() {
    return {
      freelancer: null,
      isInvisible: true,
      body: {
        first_name: this.first_name,
        last_name: this.last_name,
        description: this.description,
        email_address: this.email_address,
        phone_number: this.phone_number,
        password: this.password
      }
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
    },
    updateFreelancer() {
      FreelancersOps.updateFreelancer(this.$route.params.id, this.body)
        .then(() => {
          window.location.reload()
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
