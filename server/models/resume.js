const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ResumeSchema = new Schema({
    education_field: { type: String, required: true },
    experience_field: { type: String, required: true },
    skills_field: [{ type: String, required: true }],
    freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'Freelancer', required: true},
    
});

// Returning education

ResumeSchema
    .virtual('education')
    .get(function () {
        return education_field;
    });

// Return experience

ResumeSchema
    .virtual('experience')
    .get(function () {
        return experience_field;
    });

// Return skills

ResumeSchema
    .virtual('skills')
    .get(function () {
        return skills_field;
    });

// Return email

ResumeSchema
    .virtual('email')
    .get(function () {
        return contact_info.email;
    });
// Return phone number

ResumeSchema
    .virtual('phone number')
    .get(function () {
        return contact_info.phone_number;
    });


module.exports = mongoose.model('Resume', ResumeSchema);