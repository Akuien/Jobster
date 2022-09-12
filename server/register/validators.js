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