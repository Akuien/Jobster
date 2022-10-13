<template>
  <div id="app">
<div>
  <b-navbar toggleable="lg" type="light" variant="info">
    <b-navbar-brand href="#"><router-link to="/" class="navbar-brand">Jobster</router-link></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#"><router-link class="nav-link" to="/jobs">Jobs</router-link></b-nav-item>
        <b-nav-item href="#"><router-link class="nav-link" to="/freelancers">Freelancers</router-link></b-nav-item>
        <b-nav-item href="#"><router-link class="nav-link" to="/companies">Companies</router-link></b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>Account</em>
          </template>
          <b-dropdown-item href="#"><router-link class="nav-link" to="/login">Login</router-link></b-dropdown-item>
          <b-dropdown-item href="#"><router-link class="nav-link" to="/register">Register</router-link></b-dropdown-item>
          <b-dropdown-item href="#"><router-link class="nav-link" to="/login">Logout</router-link></b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
    <!-- Render the content of the current page view -->
    <router-view/>
  </div>
</template>

<style>
router-link {
  color:black;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
