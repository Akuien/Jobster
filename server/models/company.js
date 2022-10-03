const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//var passportLocalMongoose = require('passport-local-mongoose');
// plugin for passport-local-mongoose
//UserSchema.plugin(passportLocalMongoose);

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


var company_locationSchema = new Schema({
        city: { type: String, required: true },
        country: { type: String, required: true },
        address: { type: String, required: true },
});

const CompanySchema = new Schema({
    company_name: { type: String, required: true },
    company_description: { type: String, required: true },
    company_location: {type: company_locationSchema},
    company_email: { type: String, required: true},
    company_phone: {type: String, required: true },
    password: {type: String, required: true, select: false},
    job_posts: [{type: Schema.Types.ObjectId, ref: 'Job_posts'}],
    tokens: [ { 
        token: {type: String, required: true}
    }]
});

// Encrypt password before saving
CompanySchema.pre("save", async function(next) {
    const company = this;
    if (company.isModified("password")) {
        company.password =await bcrypt.hash(company.password, 8);
    }
    next();
});

//Generate an auth token for a company
CompanySchema.methods.generateAuthToken = async function() {
    const company = this;
    const token = jwt.sign({_id: company._id, email: company.company_email, name: company.company_name}, "secret");
    company.tokens = company.token.concat({token});
    await company.save();
    return token;
};

//Authenticate or validate user
CompanySchema.statics.findByCredentials = async (email, password) => {
    const company = await CompanySchema.findOne({email});
    if (!company) {
        throw new error({error: "Invalid login details"});
    }
    const isPasswordMatch = await bcrypt.compare(password, company.password);
    if (!isPasswordMatch) {
        throw new Error({error: "Invalid login details"});
    }
    return company;
}   

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
        return _id;
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

   /* CompanySchema
    .virtual('Token')
    .get(function () {
        return token;
    }); */

module.exports = mongoose.model('Company', CompanySchema);

