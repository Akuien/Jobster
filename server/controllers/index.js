const express = require('express');
const router = express.Router();

const CompaniesRoutes = require('./companies');
const freelancersRoutes = require('./freelancers');
const Job_post_Routes = require('./job_posts');
const resumesRoutes = require('./resumes')

module.export = {
    router,
    CompaniesRoutes,
    freelancersRoutes,
    Job_post_Routes,
    resumesRoutes
}