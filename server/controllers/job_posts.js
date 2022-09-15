var express = require('express');
var router = express.Router();
var Job_post = require('../models/job_post');


//Create Job_post
router.post('/job_posts', function(req, res, next){
    var job_post = new Job_post(req.body);
    job_post.save(function(err, job_post) {
        if (err) { return next(err); }
        res.status(201).json(job_post);
    })
});

//Get all Job_posts
router.get('/job_posts', function(req, res, next) {
    Job_post.find(function(err, job_posts) {
        if (err) { return next(err); }
        res.json({'job_posts': job_posts });
    });
});


//Get Job_post using an ID
router.get('/job_posts/:id', function(req, res, next) {
    var id = req.params.id;
    Job_post.findById(id, function(err, job_post) {
        if (err) { return next(err); }
        if (job_post === null) {
            return res.status(404).json({'message': 'Job_post not found!'});
        }
        res.json(job_post);
    });
});

//Delete Job_post using an ID
router.delete('/job_posts/:id', function(req, res, next) {
    var id = req.params.id;
    Job_post.findOneAndDelete({_id: id}, function(err, job_post) {
        if (err) { return next(err); }
        if (job_post === null) {
            return res.status(404).json({'message': 'Job_post not found'});
        }
        res.json(job_post);
    });
});

