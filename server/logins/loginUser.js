var mongoose = require('mongoose');
const freelancer = require("../models/freelancer.js")

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

// module.exports = login_user;