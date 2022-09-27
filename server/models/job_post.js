const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const JobPostSchema = new Schema({

    job_title: {type: String, required: true},
    deadline: { type: Date, required: true },
    post_date: { type: Date, required: true },
    description: { type: String, required: true },
    company: {type: Schema.Types.ObjectId, ref: 'Company'}
});


// return title
JobPostSchema
    .virtual('JobTitle')
    .get(function () {
        return job_Title;
    });


// return id
JobPostSchema
    .virtual('id')
    .get(function () {
        return id;
    });

// return deadline

JobPostSchema
    .virtual('Deadline')
    .get(function () {
        return deadline;
    });

// return post date

JobPostSchema
    .virtual('Post date')
    .get(function () {
        return post_date;
    });

// return description

JobPostSchema
    .virtual('Description')
    .get(function () {
        return description;
    });


module.exports = mongoose.model('Job_Post', JobPostSchema);