var mongoose = require('mongoose');
const company = require("./models/company.js")

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