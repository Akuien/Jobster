var express = require('express');
var router = express.Router();
var controllers = require('/controllers');


router.get('/api/resumes', controllers.resumes.get);
router.get('/api/resumes/:id', controllers.resumes.get);

router.post('/api/resumes', controllers.resumes.post);
router.put('/api/resumes/:id', controllers.resumes);
router.delete('/api/resumes/:id', controllers.resumes);
router.patch('/api/resumes/:id', controllers.resumes);



module.exports = router;
