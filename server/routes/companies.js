var express = require('express');
var router = express.Router();
var controllers = require('/controllers');


router.get('/api/companies', controllers.companies.get);
router.get('/api/companies/:id', controllers.companies.get);

router.post('/api/companies', controllers.companies.post);
router.put('/api/companies/:id', controllers.companies);
router.delete('/api/companies/:id', controllers.companies);
router.patch('/api/companies/:id', controllers.companies);


module.exports = router;
