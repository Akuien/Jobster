var mongoose = require('mongoose');
const freelancer = require("./models/freelancer.js")


// Creates a user
function create_user(email, firstName, lastName, pwd, description, phoneNumber) {
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
        password: pwd
    })

    let Tank = new Tank("Tank", profile)

    return "registered"
}