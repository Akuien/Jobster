var express = require('express');
var router = express.Router();
var controllers = require('/controllers');


router.get('/api/companies', controllers.companies.get);
router.get('/api/companies/:id', controllers.companies.getById);

router.post('/api/companies', controllers.companies.create);

router.put('/api/companies/:id', controllers.companies);

router.delete('/api/companies/:id', controllers.companies.deleteById);
router.patch('/api/companies/:id', controllers.companies.update);


module.exports = router;
