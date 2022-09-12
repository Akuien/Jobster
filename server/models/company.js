const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const CompanySchema = new Schema({
    company_name: { type: String, required: true },
    company_description: { type: String, required: true },
    company_location: {
        city: { type: String, required: true },
        country: { type: String, required: true },
        address: { type: String, required: true },
    },

    company_id: { type: String, required: true }
});

// getting company name

CompanySchema
    .virtual('name')
    .get(function () {
        return company_name;
    });


// getting company id

CompanySchema
    .virtual("company_id")
    .get(function() {
        return company_id
    });

// getting company description

CompanySchema
    .virtual('description')
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

