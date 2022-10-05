const Company = require("../models/company");
var mongoose = require('mongoose');
const express = require("express");

const router = express.Router();
var bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

/*exports.registerNewCompany = async (req, res) => {};
exports.loginCompany = async (req, res) => {};
exports.getCompanyDetails = async (req, res) => {};  */

/*
//Register company
registerNewCompany = async (req, res) => {
    try {
         //console.log(isCompany);
         if (company.length >= 1) {
           return res.status(409).json({
             message: "A company with that email already exists"
           });
         }
         const company = new Company({
            _id: new mongoose.Types.ObjectId(),
            company_name : req.body.company_name,
            company_description : req.body.company_description,
            company_location : req.body.company_location,
            company_email : req.body.company_email,
            company_phone : req.body.company_phone,
            password : req.body.password,
            job_posts : []
         });
         let data = await company.save();
         const token = await company.generateAuthToken(); 
         res.status(201).json({ data, token });
       } catch (err) {
         res.status(400).json({ err: err });
    }  
}; 
*/

registerNewCompany =  function(req, res) {
    if(req.body.company_email && req.body.password){
        Company.find({company_email: req.body.company_email}, function(err, company){
            if(err){
                return res.status(409).json({'message': 'Not able to register Company!', 'error': err});
            }
            if(company.length >= 1){
                return res.status(409).json({
                    message: 'A company with such email address already exists'
                });
            }
            bcrypt.hash(req.body.password,8,(err,hash) => {
                if(err){return res.status(500).json({error: err});}
                else{
                    var company = new Company({

                        _id: new mongoose.Types.ObjectId()  ,
                        company_name : req.body.company_name,
                        company_description : req.body.company_description,
                        company_location : req.body.company_location,
                        company_email : req.body.company_email,
                        company_phone : req.body.company_phone,
                        password : hash,
                        job_posts : []
                    });
                    let data = company;
                    const token = jwt.sign({_id: company._id, email: company.company_email, name: company.company_name}, "secret");
                    company.tokens.push({token});
                    company.save(function(err, data) {
                        if (err) { return res.status(409).json({'message': 'Company unvailable!', 'error': err}); }
                        res.status(201).json({data, token});
                    }); 
                }
            });
        });
    }
    else {
        return res.status(409).json({
            message: 'Please provide email and password'
        });
    }
};  

/*
loginCompany = function(req, res ) {
    const email = req.body.company_email;
    const password = req.body.password;

    const company = findByCredentials(email, password);

            
            if(company.length < 1){
                return res.status(401).json({
                    message: 'Please provide valid email or password'
                });
            }
            bcrypt.compare(password, company.password, function(err, result){
                if(err){
                    return res.status(401).json({
                        message: 'Please provide valid email and/or password'
                    });
                }
                if(result){
                    const token = jwt.sign({_id: company._id, email: company.company_email, name: company.company_name}, "secret");
                    return res.json({company, token})
                    //return res.status(200).json(company);
                }
                return res.status(401).json({
                    message: 'Invalid details'
                });
            });
        }



loginCompany = async (req, res) => {
    try {
      const {email, password} = req.body
      const company = await company.findOne({email})

      if(!company) {
          return res.json({status: 'error', error: 'invalid details'})
      }
      const passwordCompare = await bcrypt.compare(password, company.password);
      if(passwordCompare) {
          const token = jwt.sign({_id: company._id, email: company.company_email, name: company.company_name}, "secret");
          company.tokens.push({token});
          return res.json({company, token})
      } else {
          return res.json({status: 'error', error: 'Check the password again'})
      }
      
    } catch (error) {
      console.log(error);
    }

  }


/*
loginCompany = async (req, res) => {
    try {
      const email = req.body.company_email;
      const password = req.body.password;
      const company = await Company.findByCredentials(email, password);
      if (!company) {
        return res.status(401).json({ error: "Login failed! Check authentication credentials" });
      }
      const token = await company.generateAuthToken();
      res.status(201).json({ company, token });
    } catch (err) {
      res.status(400).json({ err: err });
    }
  };  


  loginCompany = async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const company = await findByCredentials(email, password);
      if (!company) {
        return res.status(401).json({ error: "Login failed! Check authentication credentials" });
      }
      const token = await company.generateAuthToken();
      res.status(201).json({ company, token });
    } catch (err) {
      res.status(400).json({ err: err });
    }
  };  */



  loginCompany = function(req, res ) {
    if(req.body.company_email && req.body.password){
        const email = req.body.company_email;
        Company.find({"company_email": email}, function(err, company){
            if(err){
                return res.status(404).json({'message': 'Company not found!', 'error': err});
            }
            if(company.length < 1){
                return res.status(401).json({
                    message: 'Please provide valid email and/or password'
                });
            }
            bcrypt.compare(req.body.password, company[0].password, function(err, result){
                if(err){
                    return res.status(401).json({
                        message: 'Please provide valid email and/or password'
                    });
                }
                if(result){
                    return res.status(200).json(company[0]);
                }
                return res.status(401).json({
                    message: 'Please provide valid email and/or password'
                });
            });
        });} else{
        return res.status(401).json({
            message: 'Please provide valid email and/or password'
        });
    }
};



getCompanyDetails = async (req, res) => {
    await res.json(req.companyData);
  };

  module.exports = {
    registerNewCompany,
    loginCompany,
    getCompanyDetails
  }
