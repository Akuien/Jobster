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

function company_login(mail, password) {
    const Company = mongoose.model(company)

    Company.exists({company_email: mail}, function(err, doc) {
        if (err) {
            return "invalid mail";
        }

        let company = Company.findOne("company_email", mail)

        if (company.password == password) {
            return company;
        }

        return "invalid_password"
    })
}