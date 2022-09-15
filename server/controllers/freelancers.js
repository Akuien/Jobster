const express = require('express');
const router = express.Router();

const FreelancerCommands = require('../controllers/freelancers');
const FreelancerModel = require('../models/freelancer');
const JobPostModel = require('../models/job_post');
const user_login = require("../logins/loginUser")
router.post('/freelancers', (request, response, next) => {
    
    const freelancer = new FreelancerModel(request.body);

    freelancer.save(function (err) {
        if (err) { return next(err); }
        response.status(201);
        response.json(freelancer);
    })
});

router.get('/freelancers', (request, response, next) => {

    FreelancerModel.find(function (error, freelancers) {
        if (error) { return next(error); }
        response.json({ "freelancers": freelancers });
    })
});



router.get('/freelancers/:id', function(request, response, next) {
    const id = request.params.id;
    FreelancerModel.findById(id, function (error, freelancer) {
        if (error) { return next(error); }
        if (freelancer == null) {
            return response.status(404).json({ "message": "Freelancer not found" });
        }
        response.json(freelancer);
    });
});

router.patch('/freelancers/:id', function (request, response, next) {
    const id = request.params.id;
    FreelancerModel.findById(id, function (error, freelancer) {
        if (error) { return next(error); }
        if (freelancer == null) {
            return response.status(404).json({ "message": "Freelancer not found" });
        }
        
        
        freelancer.first_name = (request.body.first_name || freelancer.first_name);
        freelancer.last_name = (request.body.last_name || freelancer.last_name);
        freelancer.email_address = (request.body.email_address || freelancer.email_address);
        freelancer.phone_number = (request.body.phone_number || freelancer.phone_number);
        freelancer.description = (request.body.description || freelancer.description);
        freelancer.password = (request.body.password || freelancer.password);

        freelancer.save();
        response.json(freelancer)
    });
});

router.delete('/freelancers/:id', function (request, response, next) {
    const id = request.params.id;
    FreelancerModel.findOneAndDelete({ _id: id }, function (error, freelancer) {
        if (error) { return next(error); }
        if (freelancer == null) {
            return response.status(404).json({ "message": "Freelancer not found" });
        }
        response.json(freelancer);
    });
});

router.post('/freelancers/:id/job_posts', function (request, response, next) {
    const id = request.params.id;


    FreelancerModel.findById(id, function (error, freelancer) {
        if (error) { return next(error); }
        if (freelancer == null) {
            return response.status(404).json({ "message": "Freelancer not found" });
        }
        
        const job_post = new JobPostModel(request.body);

        job_post.save(function (err) {
            if (err) { return next(err); }
            response.status(201);
            response.json(job_post);
        });
    

    });
});

router.get('/freelancers/:id/job_posts', function (request, response, next) {
    const id = request.params.id;

    FreelancerModel.findById(id, function (error, freelancer) {
        if (error) { return next(error); }
        if (freelancer == null) {
            return response.status(404).json({ "message": "Freelancer not found" });
        }
        
        JobPostModel.find(function (error, job_posts) {
            if (error) { return next(error); }
            response.json({ "job_posts": job_posts });
        });
    });
});

router.get('/freelancers/:id/job_posts/:id', function (request, response, next) {
    const id = request.params.id;

    FreelancerModel.findById(id, function (error, freelancer) {
        if (error) { return next(error); }
        if (freelancer == null) {
            return response.status(404).json({ "message": "Freelancer not found" });
        } 
        
const loginUser = async (request, response, next, email, password) => {
    const user = loginUser.user_login(email, password)

    if (user == "err") {
        return next(user)
    }

    if (freelancer == "user_not_found") {
        return response.status(404).json({ "message": "Invalid email", "logged_in": false, })
    }

    if (freelancer == "invalid_password") {
        return response.status(401).json({ "message": "Wrong password", "logged_in": false, })
    }

    response.json({"user": user, "logged_in": true,})
}

const login_user = async (request, response, next, email, password) => {
    const user = loginUser.loginUser(email, password)

    if (user == "err") {
        return next(user)
    }

    if (freelancer == "user_not_found") {
        return response.status(404).json({ "message": "Invalid email", "logged_in": false, })
    }

    if (freelancer == "invalid_password") {
        return response.status(401).json({ "message": "Wrong password", "logged_in": false, })
    }

    response.json({"user": user, "logged_in": true,})
}


        JobPostModel.find(function (error, job_post) {
            if (error) { return next(error); }
            if (job_post == null) {
                return response.status(404).json({ "message": "Job post not found" });
            }
            response.json(job_post);
        });
    });
});









module.exports = router;
