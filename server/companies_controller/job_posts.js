var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//var Company = require("../models/company");
var JobPost = require('../models/job_post');



//Create new jobPost
router.post('/job_posts', function(req, res, next){
    var newJobPost = new JobPost(req.body);
    newJobPost.save(function(err, addedJobPost) {
        if (err) { return next(err); }
        res.status(201).json(addedJobPost);
    })
});


//Get job post by id
router.get('/api/job_posts/:id', function(req, res, next) {
    var id = req.params.id;
    JobPost.findById(id, function(err, job_post) {
        if (err) { return next(err); }
        if (job_post === null) {
            return res.status(404).json({'message': 'Job_post not found!'});
        }
        res.json(job_post);
    });
});


//Get job posts sorted by post dates
router.get('/job_posts/sort', function (req, res, next) {

    JobPost.find().sort({
        post_date: req.query.sortByPost_date
    }).exec(function (err, results) {
        if (err) { return next(err); }
        if (!results) { return res.status(404).json({'message': 'no events found'}); }
        res.status(200).json(results);
    })
});

//Get all job posts filter by job title
router.get('/job_posts/filtered', function(req, res, next) {   
    if (!req.query.job_title){return next();}
    JobPost.find({
        job_title: { $regex: req.query.job_title, $options: 'i' }
    },
        function(err, job_posts) {
            if (err) { return next(err); }
            if (!job_posts) { return res.status(404).json(
                {'message': 'no job post found'});
            }
        res.status(200).json(job_posts);
    });
});



//Get all job posts and pagination
router.get('/job_posts/pages', function(req, res, next) {     
    JobPost.find(function(err, job_posts) {         
        if (err) { return next(err); }   

        if(req.query.page && req.query.limit){
            try{
                var pageNum = parseInt(req.query.page);         
                var limit = parseInt(req.query.limit);    
            }
            catch(error){
                res.status(409).json({'message': 'Invalid page number or limit!', 'error': err});
            }   
         
            let startIndex  = (pageNum - 1) * limit;             
            let endIndex = pageNum * limit;


            var pagesResult = {};
            if(endIndex < JobPost.length){
                pagesResult.nextPage = {
                    page: pageNum + 1,
                    limit: limit
                };
            }
            if (startIndex > 0){
                pagesResult.previousPage = {
                    page: pageNum -1,
                    limit: limit
                };
            }  
            pagesResult.results = JobPost.slice(startIndex, endIndex);
            res.json(pagesResult);         
        }else {             
            res.json({'job_posts': job_posts });         
        }     
    }); 
});     




//Replaces a job post by id.
router.put('/job_posts/:id', function(req, res) {
    var id = req.params.id;
    JobPost.findById(id, function(err, job_post) {
        if (err) { res.status(409).json({'message': 'job_post update failed!', 'error': err}); }
        if (job_post === null) {
            return res.status(404).json({'message': 'job_post not found'});
        }
        job_post.job_title = req.body.job_title;
        job_post.deadline = req.body.deadline;
        job_post.post_date = req.body.post_date;
        job_post.description = req.body.description;
        job_post.company =req.body.company;

        job_post.save();
        res.json(job_post);
    });
});

//Updates a job post by id.
router.patch('/job_posts/:id', function(req, res) {
    var id = req.params.id;
    JobPost.findById(id, function(err, job_post) {
        if (err) { res.status(409).json({'message': 'job_post not updated', 'error': err}); }
        if (job_post === null) {
            return res.status(404).json({'message': 'job_post not found'});
        }
        job_post.job_title = req.body.job_title || job_post.job_title;
        job_post.deadline = req.body.deadline || job_post.deadline;
        job_post.post_date = req.body.post_date || job_post.post_date;
        job_post.description = req.body.description || job_post.description;
        job_post.company =req.body.company || job_post.company;

        job_post.save();
        res.json(job_post);
    });
});
        
//Delete a job post by an id
router.delete('/job_posts/:id', function(req, res) {
    var id = req.params.id;
    JobPost.findOneAndDelete({_id: id}, function(err, job_post) {
        if (err) { return next(err); }
        if (job_post === null) {
            return res.status(404).json({'message': 'Job_post not found'});
        }
        res.json(job_post);
    });
});


//Deletes all job posts
router.delete('/job_posts', function(req, res) {
    JobPost.deleteMany({}, function(err, job_posts) {
        if (err) {
            return res.status(409).json({
                message: 'Deletion failed!', 'error': err
            }); }
        if (job_posts === null) {
            return res.status(404).json({'message': 'job_post not found'});
        }
        res.json(job_posts);
    });
});





module.exports = router;