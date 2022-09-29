import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Jobs from './views/Jobs.vue'
import Freelancers from './views/Freelancers.vue'
import Freelancer from './views/Freelancer.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },

    {
      path: '/login',
      name: 'login',
      component: Login
    },

    {
      path: '/register',
      name: 'register',
      component: Register
    },

    {
      path: '/jobs',
      name: 'jobs',
      component: Jobs
    },

    {
      path: '/freelancers',
      name: 'freelancers',
      component: Freelancers
    },

    {
      path: '/freelancers/:id',
      name: 'freelancer',
      component: Freelancer
    }
  ]
})
