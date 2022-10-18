<template>
  <div>
    <div>
    <b-jumbotron header="Welcome To Jobster" lead="A world leading freelancing website">
            <div class="about">
        <h3>What is Jobster?</h3>
        <p>Jobster is a world leading website for customers to get in touch with freelancers. As a customer you can create a job posting and choose the right person to do it for you. As a freelancer you can curate what jobs will appear on your dashboard, get in touch with your customers and earn money with your talents.</p>
        <router-link to="/register">Create your free profile right now!</router-link>
      </div>
    </b-jumbotron>
    </div>
    <div>
</div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'home',
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}
</script>

<style>
.about {
  padding: 1em;
  margin: auto;
  padding: 10px;
  width: 50%;
}
.btn_message {
  margin-bottom: 1em;
}

@media screen and (max-width: 768px) {
.card {
  height: 100rem;
}
}
</style>
