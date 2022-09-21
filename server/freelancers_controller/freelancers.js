const express = require('express');
require('dotenv').config(); // this imports .env file to get secret variable
const router = express.Router();
const user_login = require("../logins/loginUser");
const FreelancerModel = require('../models/freelancer');
const JobPostModel = require('../models/job_post');
const { MongoClient, ObjectId } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);//initializing mongo client 
const connected_client = client.connect();


router.post('/freelancers', async (request, response) => {
    
    try {
        const freelancer = new FreelancerModel(request.body);

        (await connected_client)
            .db('WebDevDatabase')
            .collection('Freelancers')
            .insertOne(freelancer);
        
        const data = await freelancer.save(); 
        response.status(200).json(freelancer);
    }
    catch (error) {
        response.status(400).json({ message: error.message });
    }
});

router.get('/freelancers', async (request, response) => {

    try {
        (await connected_client)
            .db('WebDevDatabase')
            .collection('Freelancers')
            .find({})
            .toArray(function (error, result) {
                if (error) {
                    response.send(error);
                } else {
                    response.json(result);
                }
            });
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
});


router.get('/freelancers/:id', async (request, response) => {

    const id = request.params.id;

    if (id == null) {
        return response.status(404).json({ "message": "Id does not exist" });
    }
    try {
        (await connected_client)
            .db('WebDevDatabase')
            .collection('Freelancers')
            .findOne({"_id": ObjectId(id)})
            .then(function (error, freelancer) {
                if (error) {
                    response.send(error);
                } else if (freelancer == null) {
                    
                    return response.status(404).json({ "message": "Freelancer not found" });
                } else {
                   response.json(freelancer);
                }
            });
        
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
});

router.patch('/freelancers/:id', async (request, response) => {
    const id = request.params.id;
    const updateValue = request.body;

    try {
        (await connected_client)
            .db('WebDevDatabase')
            .collection('Freelancers')
            .updateOne(
                { "_id": ObjectId(id) },
                { $set: updateValue}
            )
            .then(function (error, freelancer) {

                if (error) {
                    response.send(error);
                } else if (freelancer == null) {
                    
                    return response.status(404).json({ "message": "Freelancer not found" });
                } else {
                    response.json(freelancer);
                }
            }); 
    } catch (error) {
        response.status(500).json({ message: error.message });
    };
});

router.delete('/freelancers/:id', async (request, response) => {

    const id = request.params.id;

    try {
        (await connected_client)
            .db('WebDevDatabase')
            .collection('Freelancers')
            .deleteOne({ "_id": ObjectId(id) })
            .then(function (error, freelancer) {

                if (error) {
                    response.send(error);
                } else if (freelancer == null) {
                    
                    return response.status(404).json({ "message": "Freelancer not found" });
                } else {
                    response.json(freelancer);
                }
            });
        
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
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
        
// const loginUser = async (request, response, next, email, password) => {
//     const user = loginUser.user_login(email, password)

//     if (user == "err") {
//         return next(user)
//     }

//     if (freelancer == "user_not_found") {
//         return response.status(404).json({ "message": "Invalid email", "logged_in": false, })
//     }

//     if (freelancer == "invalid_password") {
//         return response.status(401).json({ "message": "Wrong password", "logged_in": false, })
//     }

//     response.json({"user": user, "logged_in": true,})
// }

// const login_user = async (request, response, next, email, password) => {
//     const user = loginUser.loginUser(email, password)

//     if (user == "err") {
//         return next(user)
//     }

//     if (freelancer == "user_not_found") {
//         return response.status(404).json({ "message": "Invalid email", "logged_in": false, })
//     }

//     if (freelancer == "invalid_password") {
//         return response.status(401).json({ "message": "Wrong password", "logged_in": false, })
//     }

//     response.json({"user": user, "logged_in": true,})
// }


        JobPostModel.find(function (error, job_post) {
            if (error) { return next(error); }
            if (job_post == null) {
                return response.status(404).json({ "message": "Job post not found" });
                loginUser
            }
            response.json(job_post);
        });
    });
});









module.exports = router;
