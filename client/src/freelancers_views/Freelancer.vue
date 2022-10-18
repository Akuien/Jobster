<template>
    <b-container fluid="md">
        <div v-for="attribute in freelancer" v-bind:key="attribute._id">
          <b-card id="card">
          <img src="https://bodhicounseling.com/wp-content/uploads/2018/05/blank-profile-picture-973460_960_720-150x150.png" alt="profile_pic" />
          <h1>{{attribute.first_name}} {{attribute.last_name}}</h1>
          <h4>{{attribute.email_address}}</h4>
          <p>{{attribute.description}}</p>
          <b-button :href="'/freelancers/' + attribute._id + '/resumes'" id="resume_button"> My Resumes </b-button>
          <b-button v-on:click="isInvisible = !isInvisible" id="edit_button">Edit profile</b-button>
          </b-card>
        </div>
        <b-row>
          <b-col>
            <b-form-input v-if="!isInvisible" type="text" class="form-control" v-model="body.first_name" placeholder="Change First Name"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-input v-if="!isInvisible" type="text" class="form-control" v-model="body.last_name" placeholder="Change Last Name"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
            <b-col>
              <b-form-textarea rows="5" max-rows="8" maxlength="80" v-if="!isInvisible" type="text" class="form-control" v-model="body.description" placeholder="Change description"></b-form-textarea>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
              <b-form-input v-if="!isInvisible" type="text" class="form-control" v-model="body.email_address" placeholder="Change email address"></b-form-input>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
              <b-form-input v-if="!isInvisible" type="text" class="form-control" v-model="body.phone_number" placeholder="Change phone number"></b-form-input>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
              <b-form-input v-if="!isInvisible" type="password" class="form-control" v-model="body.password" placeholder="Change password"></b-form-input>
            </b-col>
        </b-row>
        <div style="padding:5em">
        <b-button v-if="!isInvisible" @click="updateFreelancer()">Save changes</b-button>
        </div>
    </b-container>
</template>

<style scoped>

.form-control {
  width:23em;
}
.col {
  margin-top: 30px;
  justify-content: center;
  display: flex;
}

#resume_button {
  width: 130px;
  height: 40px;
  padding: 10px;
  background-color: rgb(169, 162, 162);
}
#edit_button {
  margin-left: 8px;
}

.card {
  height: 26rem;
  width: 90%;
  background-color: #eceff2;
  padding: 10px;
  margin-top: 40px;
  margin-left: 80px;
  margin-bottom: 20px;
  border-radius: 8px;
  position: relative;
  text-align: center;
  }

img {
  border-radius: 50%;
  height: 120px;
  width: 120px;
}

p {
  padding: 20px;
}

@media screen and (max-width: 768px) {

#card {
    width: 90%;
    margin-left: 20px;
    height: 35rem;
  }
#edit_button {
  margin-top: 5px;
}
#resume_button {
   margin-top: 5px
}
.col {
  width: 200px;
}
}

</style>

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
          this.$toasted.show(error)
        })
    },
    updateFreelancer() {
      FreelancersOps.updateFreelancer(this.$route.params.id, this.body)
        .then(() => {
          this.$toasted.show('Account has been successfully updated!')
          window.location.reload()
        })
        .catch(error => {
          this.$toasted.show(error)
        })
    }
  },
  mounted() {
    this.getFreelancer(this.$route.params.id)
  }
}
</script>
