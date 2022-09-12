var mongoose = require('mongoose');
const company = require("./models/company.js")

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

function register_company(name, description, id, city, country, address, email, phone, password) {
    let info = validateDetails(email, password, phone);
    
    if (info == "valid") {
        return info
    }

    let profile = new company({
        company_name: name,
        company_description: description,
        company_location: {
            city: city,
            country: country,
            address: address,
        },

        company_email: email,
        company_phone: phone,
        company_id: id,
        password: password,
    })

    let Tank = new Tank("Tank", profile)

    return "registered"
}