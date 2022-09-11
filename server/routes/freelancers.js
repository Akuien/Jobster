var express = require('express');
var router = express.Router();
var controllers = require('/controllers');


router.get('/api/freelancers', controllers.freelancers.get);
router.get('/api/freelancers/:id', controllers.freelancers.get);

router.post('/api/freelancers', controllers.freelancers.post);
router.put('/api/freelancers/:id', controllers.freelancers);
router.delete('/api/freelancers/:id', controllers.freelancers);
router.patch('/api/freelancers/:id', controllers.freelancers);


module.exports = router;
