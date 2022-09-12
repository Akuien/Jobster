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