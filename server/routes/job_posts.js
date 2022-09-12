var express = require('express');
var router = express.Router();
var controllers = require('/controllers');


router.get('/api/job_posts', controllers.job_posts.get);
router.get('/api/resumes/:id', controllers.job_posts.get);

router.post('/api/job_posts', controllers.job_posts.post);
router.put('/api/resumes/:id', controllers.job_posts);
router.delete('/api/resumes/:id', controllers.job_posts);
router.patch('/api/resumes/:id', controllers.job_posts);



module.exports = router;
