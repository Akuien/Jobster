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
  <b-card
    overlay
    img-src="https://picsum.photos/900/250/?image=3"
    img-alt="Card Image"
    text-variant="white"
    title="Quality Assurance"
  >
    <b-card-text>
      Jobster is your best freelancing website available that guarantees you quality delivery to both you as a company and to your
      customers. Its a place compose of the best talents and networks availabe in the industry for you as a company.
      The companies available are the best for your as a freelancer, top 5% best companies globally ready to work with you
      at Jobster with flexible working hours and good pay for your talent. You also get to work with a team of like minded individuals
      that ensure your personal and career growth.
    </b-card-text>
  </b-card>
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
</style>
