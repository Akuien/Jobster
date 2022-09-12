var express = require('express');
var router = express.Router();
var controllers = require('/controllers');


router.get('/api/job_posts', controllers.job_posts.get);
router.get('/api/job_posts/:id', controllers.job_posts.get);

router.post('/api/job_posts', controllers.job_posts.post);
router.put('/api/job_posts/:id', controllers.job_posts);
router.delete('/api/job_posts/:id', controllers.job_posts);
router.patch('/api/job_posts/:id', controllers.job_posts);



module.exports = router;
