<template>
  <div>
    <form action="/">
      <h1>Log in</h1>
      <div id="form">
        <div class= "mt-2">
          <input type="email" class="mt-3" id="email" placeholder="E-mail">
        </div>

        <div class= "mt-2">
          <input type="password" class="mt-3" id="pwd" placeholder="Password">
        </div>
      </div>
      <b-button class="btn_message" variant="primary" v-on:click="getData()" >Log in</b-button>
    </form>
  </div>
</template>

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
