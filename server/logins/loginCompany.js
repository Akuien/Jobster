var mongoose = require('mongoose');
const company = require("./models/company.js")


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