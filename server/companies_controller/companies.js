const { json } = require("body-parser"); // No idea why TF this appeared, but I'm keeping it.Just in case
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Company = require("../models/company");
var JobPost = require('../models/job_post');

//require('dotenv').config(); // this imports .env file to get secret variable

router.get('/companies', function (request, response) {

    try {

        Company.find({}, function (error, companies) {
            if (error) {
                response.send(error)
            }
            response.send(companies)
        });
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
});


//Create company **POST
router.post('/companies', function(req, res, next) {
    var company = new Company(req.body);
    company.save(function(err, company) {
        if (err) {return next(err);}
        res.status(201).json(company)
    })
});

//Get company's profile by ID
router.get('/companies/:id', function(req, res, next) {
    var id = req.params.id;
    Company.find({"_id":id}, function(err, company) {
        if (err) { return next(err); }
        if (company === null) {
            return res.status(404).json({'message': 'Company does not exist'});
        }
        res.json(company);
    })
    
})




//Update company's details/profile **PATCH
router.patch('/companies/:id', function(req, res, next) {
    var id = req.params.id;
    Company.findById(id, function(err, company) {
        if (err) { return next(err); }
        if (company == null) {
            return res.status(404).json(
{"message": "Company not found"});
        }
        company.company_name = (req.body.company_name || company.company_name);
        company.company_description = (req.body.company_description || company.company_description);
        company.company_location = (req.body.company_location || company.company_location);
        company.company_email =  (req.body.company_email || company.company_email);
        company.company_phone =  (req.body.company_phone || company.company_phone);
        company.password = (req.body.password || company.password);
        company.job_posts =  (req.body.job_posts || company.job_posts);


        company.save();
        res.json(company);
    });
});


//Delete a company by ID
router.delete('/companies/:id', function(req, res) {
    var id = req.params.id;

    Company.findOneAndDelete({"_id": id}, function(err, company) {
        if (err) { return next(err); }
        if (company === null) {
            return res.status(404).json({'message': 'Company not found'});
        }
        res.json(company);
    });
});


/*/Entities relationship operations
//add a job post to a company
router.post('/companies/:id/job_posts/add', function(req, res){
    var id = req.params.id;
    var jobPostId = req.body.JobPost;
    Company.findById(id, function(err, company) {
        if (err) { 
            return res.status(409).json({'message': 'No company with such id exists!', 'error': err});
        }

        if (company === null) {
            return res.status(404).json({'message': 'company not found'});
        }

        if (jobPostId === null) {
            return res.status(404).json({'message': 'job_post not found'});
        }

        if(company.job_posts.includes(jobPostId)){
            return res.status(409).json({'message': 'Job post already exists'});
        }  

        try{
            company.job_posts.push(jobPostId);

        }

        catch(err) {
            return res.status(409).json({'message': err});
        }



        company.save();
        res.json(company);
    });
}); 
*/

router.post('/companies/:id/job_posts', async (request, response) => {
    const id = request.params.id;
    const job_post = request.body.job_posts;


    try {

        const createJobPost = await JobPost.create({
            
            job_title: request.body.job_title,
            deadline: request.body.deadline,
            post_date: request.body.post_date,
            description: request.body.description,
            company: id
        })

        const createdJob = await createJobPost.save();

        
        Company.findByIdAndUpdate({ "_id": id }, { $push: { job_posts: createdJob } }, { safe: true, upsert: true }, function (error, job_posts) {
            if (error) {
                response.send(error);
            } else {
                response.json(job_posts);
            }
        });
            
    } catch (error) {

        response.status(500).json({ message: error.message });
    }

});



router.get('/companies/:id/job_posts', async (request, response) => {

    const id = request.params.id;

    try {

            JobPost.find({ "company": id}, function (error, job_posts) {
                if (error) {
                    response.send(error);
                } else {
                    response.json(job_posts);
                }
            })
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
});



//Get a specific company's job post using an id.
router.get('/companies/:id/job_posts/:id', async (request, response) => {

    const id = request.params.id;

    try {

        JobPost
            .findOne({ "_id": id }, function (error, job_post) {
                if (error) {
                    response.send(error);
                }
                response.json(job_post);
            })
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
});


//Delete all company's job posts
router.delete('/companies/:id/job_posts', function(req, res) {

    var id = req.params.id;

    Company.findById(id, function(err, company) {
        if (err) {  return res.status(404).json({'message': 'company not found'}); }

        if (company === null) {
            return res.status(404).json({'message': 'company do not exists'});
        }


        company.job_posts = [];
        company.save();
        res.json(company);
    });
});



//Delete a specific job post from a company
router.delete('/companies/:id/job_posts/:id', async (request, response) => {

    const id = request.params.id;
  
    try {

        JobPost
            .findOneAndDelete(id)
            .then(function (error, job_post) {
                if (error) {
                    response.send(error);
                }
                response.json(job_post);
            });
    
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});


//======================================================================
/*
router.delete('/companies/:id/job_posts/:id', function(req, res)
router.delete('/freelancers/:id/resumes/:id', async (request, response)
get resume by
 */



/*
Companies role

Create a companies profile
Get company profile

Create Job_post


get all job_posts
Get a job_post by ID

Delete all job_posts
Delete job_post using an ID

Replace a specific job_post using ID
Update a job_post using an ID
*/
    


module.exports = router;