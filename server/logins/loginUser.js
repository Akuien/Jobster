var mongoose = require('mongoose');
const freelancer = require("../models/freelancer.js")


function loginUser(mail, password) {
    freelancer.findOne({email_address: mail}, function (err, user) {
        if (err) {
            return "err"
        }

        if (freelancer == null) {
            return "user_not_found"
        }

        if (freelancer.password != password) {
            return "invalid_password"
        }

        return freelancer
    })
}

//module.exports(login_user)