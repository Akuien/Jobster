<template>
  <div class="form">
    <form action="/">
      <h1>Create your own profile</h1>
      <div class="section">
        <h3>Name:</h3>
        <div class="row">
          <div class="col">
            <input type="text" class="form-control" id="fname" placeholder="First Name">
          </div>

          <div class="col">
            <input type="text" class="form-control" id="lname" placeholder="Last Name">
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Contact information:</h3>
        <div class="row">
          <div class="col">
            <input type="email" class="form-control" id="email" placeholder="Your E-Mail address">
          </div>

          <div class="col">
            <input type="text" class="form-control" id="phone_num" placeholder="Your phone number">
          </div>
        </div>

        <div class="section">
          <h3>Password:</h3>

          <div class="col">
            <input type="password" class="form-control" id="pwd" placeholder="Password">
          </div>
        </div>
      </div>
    </form>
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
