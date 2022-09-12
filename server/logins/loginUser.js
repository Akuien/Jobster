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

function login_user(mail, password) {
    const User = mongoose.model(freelancer)

    User.exists({email: mail}, function(err, doc) {
        if (err) {
            return "invalid_email"
        }

        let user =  User.findOne("email", mail)
        
        if (user.password == password) {
            return user
        }

        return "wrong_password"
    })
}