const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var company_locationSchema = new Schema({
        city: { type: String, required: true },
        country: { type: String, required: true },
        address: { type: String, required: true },
});

const CompanySchema = new Schema({
    company_name: { type: String, required: true },
    company_description: { type: String, required: true },
    company_location: {type: company_locationSchema},
    company_email: { type: String, required: true },
    company_phone: {type: String, required: true },
    password: {type: String, required: true},
    job_posts: [{type: Array, ref: 'Job_posts', required: false}]
});

// getting company name

CompanySchema
    .virtual('name')
    .get(function () {
        return company_name;
    });


// getting company id

CompanySchema
    .virtual("id")
    .get(function() {
        return id;
    });

// getting company description

CompanySchema
    .virtual('Description')
    .get(function () {
        return description;
    });

// getting location

CompanySchema
    .virtual('name')
    .get(function () {
        return company_name;
    });

// return city

CompanySchema
    .virtual('city')
    .get(function () {
        return company_location.city;
    });

// return country

CompanySchema
    .virtual('country')
    .get(function () {
        return company_location.country;
    });

// return address

CompanySchema
    .virtual('city')
    .get(function () {
        return company_location.address;
    });

// getting company's url

CompanySchema
    .virtual('url')
    .get(function () {
        return `/models/company/${this._id}`;
    });

module.exports = mongoose.model('Company', CompanySchema);

