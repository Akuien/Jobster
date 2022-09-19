var express = require('express');
var router = express.Router();
var Resume = require('../models/resume')


// Create Resume
router.post('/resumes', function(req, res, next){
    var resume = new Resume(req.body);
    resume.save(function(err, resume) {
        if (err) { return next(err); }
        res.status(201).json(resume);
    })
});

//Get all Resumes
router.get('/resumes', function(req, res, next) {
    Resume.find(function(err, resumes) {
        if (err) { return next(err); }
        res.json({'resumes': resumes });
    });
});


//Get a resume by ID
router.get('/resumes/:id', function(req, res, next) {
    var id = req.params.id;
    Resume.findById(id, function(err, resume) {
        if (err) { return next(err); }
        if (resume === null) {
            return res.status(404).json({'message': 'Resume not found!'});
        }
        res.json(resume);
    });
});

//Delete Resume by ID
router.delete('/resumes/:id', function(req, res, next) {
    var id = req.params.id;
    Resume.findOneAndDelete({_id: id}, function(err, resume) {
        if (err) { return next(err); }
        if (resume === null) {
            return res.status(404).json({'message': 'Resume not found'});
        }
        res.json(resume);
    });
});


module.exports = router;
