<template>
  <div class="form">
    <form action="/">
      <h1>Log in</h1>
      <div id="form">
        <b-col>
          <b-form-input type="email" class="form-control" id="email" placeholder="E-mail"></b-form-input>
        </b-col>

        <b-col>
          <b-form-input type="password" class="form-control" id="pwd" placeholder="Password"></b-form-input>
        </b-col>
          <b-button class="btn_message" variant="primary" v-on:click="getData()">Log in</b-button>
      </div>
    </form>
  </div>
</template>

<style scoped>
 .form-control {
    width: 25rem;
 }

 .col {
  margin-top: 30px;
  justify-content: center;
  display: flex;
}

.btn_message {
  width: 20rem;
  margin-top: 2rem;
}

 @media screen and (max-width: 768px) {
   .form-control {
    width: 20rem;
    }
    .btn_message {
      width: 20rem;
      margin-top: 2rem;
    }
 }
</style>

<script>
export default {
  name: 'login',

  methods: {
    getData() {
      const email = document.getElementById('email').value
      const password = document.getElementById('pwd').value

      alert(email + ' ' + password)
    }
  }
}
</script>

<style>
  .form, #form {
    margin: auto;
    padding: 10px;
    width: 50%;
  }

  form {
    margin-top: 2em;
  }
</style>
