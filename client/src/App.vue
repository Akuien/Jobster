<template>
  <div id="app">
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">Jobster</router-link>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="collapsibleNavbar">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" href="/jobs">Jobs</router-link>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Log in</a>
              <ul class="dropdown-menu">
                <li><router-link class="dropdown-item" href="/login">Login</router-link></li>
                <li><router-link class="dropdown-item" href="/register">Register</router-link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div id="nav">
      <router-link to="/login"> Log in</router-link>
    </div>
    <!-- Render the content of the current page view -->
    <router-view/>
  </div>
</template>

<style>
router-link {
  color: white;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
