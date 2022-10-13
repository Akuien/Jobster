const express = require('express');
const router = express.Router();
const user_login = require("../logins/loginUser");
const FreelancerModel = require('../models/freelancer');
const ResumeModel = require('../models/resume');
const JobPostModel = require('../models/job_post');
const freelancers = []



router.post('/freelancers', async (request, response) => {

    
    try {

        const freelancer = new FreelancerModel({

            first_name: request.body.first_name,
            last_name: request.body.last_name,
            email_address: request.body.email_address,
            phone_number: request.body.phone_number,
            description: request.body.description,
            password: request.body.password
        })
        const createdFreelancer = await freelancer.save();
        freelancers.push(createdFreelancer)
        
        response.json(createdFreelancer);
    }
    catch (error) {
        response.status(400).json({ message: error.message });
    }
});

router.get('/freelancers', function (request, response) {

    try {

        FreelancerModel.find({}, function (error, freelancers) {
            if (error) {
                response.send(error)
            }
            response.send(freelancers)
        });
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
});


router.get('/freelancers/:id', function (request, response) {

    const id = request.params.id;

    if (id == null) {
        return response.status(404).json({ "message": "Id does not exist" });
    }
    try {

        FreelancerModel.find({"_id": id}, function (error, freelancer) {
            if (error) {
                response.send(error)
            }
            response.send(freelancer)
        });
  
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
});

router.patch('/freelancers/:id', async (request, response) => {

    const id = request.params.id;
    const body = request.body;

    try {

        const updateFreelancer = await FreelancerModel.findByIdAndUpdate(id, body);
    
        response.json(updateFreelancer);
     } catch (error) {
         response.status(500).json({ message: error.message });
     };
});


router.put('/freelancers/:id', async (request, response) => {

    const id = request.params.id;

    try {
        FreelancerModel.findById(id, function(err, freelancer) {
            if (err) { response.status(409).json({'message': 'freelancer update failed!', 'error': err}); }
            if (freelancer === null) {
                return response.status(404).json({'message': 'Freelancer not found'});
            }
            freelancer.first_name = request.body.first_name;
            freelancer.last_name = request.body.last_name;
            freelancer.email_address = request.body.email_address;
            freelancer.phone_number = request.body.phone_number;
            freelancer.description = request.body.description;
            freelancer.resume = request.body.resume;
            freelancer.password = request.body.password;
    
            freelancer.save();
            response.json(freelancer);
        });

     } catch (error) {
         response.status(500).json({ message: error.message });
     };
});

router.delete('/freelancers/:id', async (request, response) => {

    const id = request.params.id;

    try {

        const deletedFreelancer = await FreelancerModel.findByIdAndRemove(id).exec();
        response.send(deletedFreelancer);
    
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

router.post('/freelancers/:id/resumes', async (request, response) => {
    const id = request.params.id;
    const resume = request.body.resume;


    try {

        const createResume = await ResumeModel.create({
            
            education_field: request.body.education_field,
            experience_field: request.body.experience_field,
            skills_field: request.body.skills_field,
            freelancer: id
        })
        

        const createdResume = await createResume.save();

        
        FreelancerModel.findByIdAndUpdate({ "_id": id }, { $push: { resume: createdResume } }, { safe: true, upsert: true }, function (error, resume) {
            if (error) {
                response.send(error);
            } else {
                response.json(resume);
            }
        });
            
    } catch (error) {
        
        
        response.status(400).json({ message: 'Please fill all the fields' });
    }

});

router.get('/freelancers/:id/resumes', async (request, response) => {

    const id = request.params.id;

    try {

            ResumeModel.find({ "freelancer": id}, function (error, resumes) {
                if (error) {
                    response.send(error);
                } else {
                    response.json(resumes);
                }
            })
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
});


router.get('/freelancers/:id/resumes/:id', async (request, response) => {

    const id = request.params.id;

    try {

        ResumeModel
            .findOne({ "_id": id }, function (error, resume) {
                if (error) {
                    response.send(error);
                }
                response.json(resume);
            })
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
});


router.delete('/freelancers/:id/resumes/:id', async (request, response) => {

    const id = request.params.id;
  
    try {

        ResumeModel
            .findOneAndDelete(id)
            .then(function (error, delResume) {
                if (error) {
                    response.send(error);
                }
                response.json(delResume);
            });
    
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

router.get('/freelancers?skills_field=JavaScript', async (request, response) => {

  
    try {// does not work for now

        FreelancerModel
            .find({"resume.skills_field": "JavaScript"})
            .select("first_name")
            .exec()
        
        
    } catch (error) {
        response.status(500).json({ message: error.message });
    }


});


//Get freelancer filter by first name
router.get('/freelancers', function(req, res, next) {   
    if (!req.query.first_name){return next();}
    FreelancerModel.find({
        first_name: { $regex: req.query.first_name, $options: 'i' }
    },
        function(err, freelancers) {
            if (err) { return next(err); }
            if (!freelancers) { return res.status(404).json(
                {'message': 'no freelancer found'});
            }
        res.status(200).json(freelancers);
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
