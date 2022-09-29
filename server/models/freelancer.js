const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FreelancerSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email_address: { type: String, required: true },
    phone_number: { type: String, required: true },
    description: { type: String, required: true },
    resume: [{ type: Array, ref: 'Resume', required: false }],
    password: { type: String, required: true },
});

// Returning full name

FreelancerSchema
    .virtual('full name')
    .get(function () {
        return first_name + " " + last_name;
    })

// Return description

FreelancerSchema
    .virtual('Description')
    .get(function () {
        return description;
    })

// Return id

FreelancerSchema
    .virtual('Id')
    .get(function () {
        return id;
    })

// Return url

FreelancerSchema
    .virtual('url')
    .get(function () {

        return `/models/freelancer/${this._id}`;
    })

const createModel = new mongoose.model('Freelancer', FreelancerSchema);

module.exports = createModel;