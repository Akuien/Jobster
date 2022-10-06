const Company = require("../models/company");
var mongoose = require('mongoose');
const express = require("express");

const router = express.Router();
var bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");



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




  loginCompany = (req, res) => {
      const email = req.body.company_email;
      const password = req.body.password;
        console.log(req.body)
      Company.find({company_email: req.body.company_email}, function(err, company){
        if (err) { return next(err); }
        console.log(company)
        if (!company) {
            return res.status(404).json({ error: "Account does not exist." });
        }
        if (bcrypt.compare(password, company.password)){
            const token = jwt.sign({_id: company._id, email: company.company_email, name: company.company_name}, "secret");
            res.status(201).json({ company, token });    
        } else {
            return res.status(400).json({error: 'Email or password incorrect.'})
        }
     }).catch((err) => {return res.send(err);});
    }; 
    


getCompanyDetails = async (req, res) => {
    await res.json(req.companyData);
  };

  module.exports = {
    registerNewCompany,
    loginCompany,
    getCompanyDetails
  }
