const { json } = require("body-parser"); // No idea why TF this appeared, but I'm keeping it.Just in case
var company = require("../models/company");
const freelancer = require("../models/freelancer");

const createCompany = async(request, response, next) => {
    const company = new company(request.body)

    freelancer.save(function(err) {
        if (err) {
            return next(err);
        }

        response.status(201)
    });
};

const getAllCompanies = async (request, response, next) => {
    company.find(function(err, companies) {
        if (err) {
            return next(err);
        }

        response.json({"companies": companies});
    });
};

const getOneCompany = async (request, response, next) => {
    const id = request.params.id;

    company.findById(id, function (err, company) {
        if (err) {
            return next(err);
        }

        if (freelancer == nul) {
            return response.status(404).json({ "message": "Cojpany not found" });
        }

        response.json(company)
    }) 
}

const deleteOneCompany = async (request, response, next) => {
    const id = request.params.id;

    freelancer.findOneAndDelete({_id: id}, function (err, freelancer) {
        if (err) {
            return next(err);
        }

        if (freelancer == nul) {
            return response.status(404).json({"message": "Company not found"});
        }

        return json(freelancer);
    })
}
