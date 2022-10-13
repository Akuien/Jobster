import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './freelancers_views/RegisterFreelancer.vue'
import Jobs from './views/Jobs.vue'
import Freelancers from './freelancers_views/Freelancers.vue'
import Freelancer from './freelancers_views/Freelancer.vue'
import Companies from './companies_views/Companies.vue'
import Company from './companies_views/Company.vue'
import JobPosts from './companies_views/Job_Posts.vue'
import Resumes from './freelancers_views/FreelancerResumes.vue'
import AddResume from './freelancers_views/AddResume.vue'
import JobPost from './views/job_posts.vue'

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
    },

    {
      path: '/companies',
      name: 'companies',
      component: Companies
    },

    {
      path: '/companies/:id',
      name: 'company',
      component: Company
    },

    {
      path: '/companies/:id/job_posts',
      name: 'job_posts',
      component: JobPosts
    },

    {
      path: '/freelancers/:id/resumes',
      name: 'resumes',
      component: Resumes
    },

    {
      path: '/job_posts/:id',
      name: 'job_post',
      component: JobPost
    },

    {
      path: '/freelancers/:id/resumes/create_resume',
      name: 'create_resume',
      component: AddResume
    }
  ]
})
