const freelancer = require('../models/freelancer');


// create a freelancer
const createFreelancer = async (request, response, next) => {
    const freelancer = new freelancer(request.body);

    freelancer.save(function (err) {
        if (err) { return next(err); }
        response.status(201);
    })
};

// get all freelancers

const getAllFreelancers = async (request, response, next) => {
    freelancer.find(function (err, freelancers) {
        if (err) { return next(err); }
        response.json({ "freelancers": freelancers })
    });
};

// get freelancer by id

const getOneFreelancer = async (request, response, next) => {
    const id = request.params.id;
    freelancer.findById(id, function (err, freelancer) {
        if (err) { return next(err); }
        if (freelancer == null) {
            return response.status(404).json({ "message": "Freelancer not found" });
        }
        response.json(freelancer); 
    });
}

// delete one freelancer

const deleteOneFreelancer = async (request, response, next) => {
    const id = request.params.id;
    freelancer.findOneAndDelete({ _id: id }, function (err, freelancer) {
        if (err) { return next(err); }
        else if (freelancer == null) {
            return response.status(404).json({ "message": "Freelancer not found" });
        }
        response.json(freelancer);
    })
}


module.exports = {
    createFreelancer,
    getAllFreelancers,
    getOneFreelancer,
    deleteOneFreelancer
}