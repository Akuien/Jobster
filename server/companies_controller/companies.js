const { json } = require("body-parser"); // No idea why TF this appeared, but I'm keeping it.Just in case
var companyModel = require("../models/company");
var Job_postModel = require('../models/job_post');

var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
const company = require("../models/company");
const client = new MongoClient(process.env.MONGODB_URI);//initializing mongo client
const connected_client = client.connect();
//require('dotenv').config(); // this imports .env file to get secret variable



//Create company **POST
router.post('/companies', async(request, response) => {
    const company = new company(request.body)
    try {
        const company = new companyModel(request.body);
        
        (await connected_client)
            .db('WebDevDatabase')
            .collection('Companies')
            .insertOne(company);
        
        const data = await company.save();
        response.status(200).json(company);
    }
    catch (error) {
        response.status(400).json({ message: error.message });
    }
});




//Get company's profile **GET /:id
router.get('/companies/:id', async (request, response) => {
    const id = request.params.id;
    

    if (id == null) {
        return response.status(404).json({ "message": "Company not found" });
    }
    try {
        (await connected_client)
            .db('WebDevDatabase')
            .collection('Companies')
            .findOne({"_id": ObjectId(id)})
            .then(function (error, company) {
                if (error) {
                    response.send(error);
                } else {
                   response.json(company);
                }
            });
const { MongoClient, ObjectId } = require('mongodb');

        
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
});





//Update companies profile **PATCH
router.patch('/companies/:id', async (request, response) => {
    const id = request.params.id;
    const updateValue = request.body;

    try {
        (await connected_client)
            .db('WebDevDatabase')
            .collection('Companies')
            .updateOne(
                { "_id": ObjectId(id) },
                { $set: updateValue}
            )
            .then(function (error, company) {

                if (error) {
                    response.send(error);
                } else if (company == null) {
                    
                    return response.status(404).json({ "message": "Company not found" });
                } else {
                    response.json(company);
                }
            }); 
    } catch (error) {
        response.status(500).json({ message: error.message });
    };
});






//Create Job_post **POST
router.post('/companies/:id/job_posts', async(request, response) => {
    const company = new company(request.body)
    try {
        const company = new companyModel(request.body);
        
        (await connected_client)
            .db('WebDevDatabase')
            .collection('Companies')
            .insertOne(company);
        
        const data = await company.save();
        response.status(200).json(company);
    }
    catch (error) {
        response.status(400).json({ message: error.message });
    }
});

// Get all Job_posts from all companies
router.get("/job_posts", async(request, response) => {
    try {
        (await connected_client)
            .db('WebDevDatabase')
            .collection('Job_post')
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
})





//Get all Job_posts **GET
router.get('/companies/:id/job_posts', async (request, response) => {
    try {
        (await connected_client)
            .db('WebDevDatabase')
            .collection('Job_post')
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









//Get Job_post using an ID **GET /:id
router.get('/companies/:id/job_posts/:id', async (request, response) => {
    const id = request.params.id;

    if (id == null) {
        return response.status(404).json({ "message": "Id does not exist" });
    }
    try {
        (await connected_client)
            .db('WebDevDatabase')
            .collection('Job_post')
            .findOne({"_id": ObjectId(id)})
            .then(function (error, job_post) {
                if (error) {
                    response.send(error);
                } else if (job_post == null) {
                    
                    return response.status(404).json({ "message": "Job_post not found" });
                } else {
                   response.json(job_post);
                }
            });
        
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
});







//Delete all job_posts **DELETE
//router.delete('/companies/:id/job_posts', function(req, res, next) {









//Delete Job_post using an ID **DELETE /:id
router.delete('/companies/:id/job_posts/:id', function(req, res, next) {
    var id = req.params.id;
    Job_postModel.findOneAndDelete({_id: id}, function(err, job_post) {
        if (err) { return next(err); }
        if (job_post === null) {
            return res.status(404).json({'message': 'Job_post not found'});
        }
        res.json(job_post);
    });
});









//Replace/Update a whole job_post **PUT
//router.put('/companies/:id/job_posts/:id', function(req, res, next) {
// create employee and send back all employees after creation
router.put('/companies/:id/job_posts/:id', function(req, res) {
	// create mongose method to update a existing record into collection
	let id = req.params._id;
	var data = {
		job_post_id : req.body.job_post_id,
		deadline : req.body.deadline,
		post_date : req.body.post_date,
        description : req.body.description
	}

	// save the job_post
	Job_postModel.findByIdAndUpdate(id, data, function(err, job_post) {
	if (err) throw err;

	});
});










//Update a job_post using ID **PATCH
router.patch('/companies/:id/job_posts/:id', async(request, response) => {
    const id = request.params.id;
    const updateValue = request.body;

    try {
        (await connected_client)
            .db('WebDevDatabase')
            .collection('Job_posts')
            .updateOne(
                { "_id": ObjectId(id) },
                { $set: updateValue}
            )
            .then(function (error, job_post) {

                if (error) {
                    response.send(error);
                } else if (job_post == null) {
                    
                    return response.status(404).json({ "message": "Job_post not found" });
                } else {
                    response.json(job_post);
                }
            }); 
    } catch (error) {
        response.status(500).json({ message: error.message });
    };
});










//Delete company **DELETE
router.delete('/companies/:id' , function(req, res, next) {
    var id = req.params.id;
    companyModel.findOneAndDelete({_id: id}, function(err, Company) {
        if (err) { return next(err); }
        if (company === null) {
            return res.status(404).json({'message': 'Company not found'});
        }
        res.json(company);
    });
});


module.exports = router;



