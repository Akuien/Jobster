<template>
  <div class="form">
    <h1>Create your own profile</h1>
    <div id="profile_type">
      <h3>Profile type:</h3>
      <div type="option" class="btn btn-secondary mr-3 ml-3" id="choose_freelancer">Freelancer</div>
      <div type="option" class="btn btn-secondary mr-3 ml-3" id="choose_company">Company</div>
    </div>

    <form action="/" id="freelancer">
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

    <form action="/" id="company">
      <div class="section">
        <h3>Company name:</h3>
        <div class="row">
          <div class="col">
            <input type="text" class="form-control" id="fname" placeholder="First Name">
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
          <h3>Location:</h3>
          <div class="row">
            <div class="col">
              <input type="text" class="form-control" id="address" placeholder="Street and address (Streetgatan 7, 1234)">
            </div>

            <div class="col">
              <input type="text" class="form-control" id="city" placeholder="City">
            </div>
            <div class="col">
              <input type="text" class="form-control" id="city" placeholder="Zip code">
            </div>
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

<script>
import $ from 'jquery'
export default {
  mounted() {
    $(document).ready(function () {
      $('#freelancer').hide()
      $('#company').hide()

      $('#choose_freelancer').click(function () {
        $('#company').hide(10)
        $('#freelancer').show(700)
      })

      $('#choose_company').click(function () {
        $('#freelancer').hide(10)
        $('#company').show(700)
      })
    })
  }
}
</script>

<style>
  .option {
    margin: 2em;
  }

  .section {
    padding: 2em;
  }

  .form, #form {
    margin: auto;
    padding: 10px;
    width: 50%;
  }
</style>
