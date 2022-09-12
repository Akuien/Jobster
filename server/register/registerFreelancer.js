var mongoose = require('mongoose');
const freelancer = require("./models/freelancer.js")

// Variables
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/WebDevDatabase';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});

function create_user(email, firstName, lastName, password, description, phoneNumber) {
    info = validateDetails(email, password, phoneNumber)

    if (info != "valid") {
        return info
    }

    let profile = new freelancer({
        first_name: firstName,
        lastName: lastName,
        email_address: address,
        phone_number: phoneNumber,
        description: description,
    })

    let Tank = new Tank("Tank", profile)

    return "registered"
}

function validateDetails(email, password, phoneNumber) {
    // Checks if email, phone number and password are correct
    if (valid_email(email) && valid_phone(phoneNumber) && valid_pwd(password)) {
        "valid"
    } 

    if (!valid_email(email)) {
        return "Invalid email"
    }

    if (!valid_phone(phoneNumber)) {
        return "Invalid phone"
    }

    if (!valid_pwd(password)) {
        return "Invalid password"
    }
}

function valid_email(email) {
    if (email.split("@").lenth - 1 == 1 || email.split(".").length - 1 >= 1) {
        return true
    }

    return false
}

function valid_pwd(pwd) {}
function valid_phone(phone) {}