const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const JobPostSchema = new Schema({

    job_post_id: { type: String, required: true },
    deadline: { type: Date, required: true },
    post_date: { type: Date, required: true },
    description: { type: String, required: true }
});

// return id

JobPostSchema
    .virtual('id')
    .get(function () {
        return job_post_id;
    });

// return deadline

JobPostSchema
    .virtual('deadline')
    .get(function () {
        return deadline;
    });

// return post date

JobPostSchema
    .virtual('post date')
    .get(function () {
        return post_date;
    });

// return description

JobPostSchema
    .virtual('description')
    .get(function () {
        return description;
    });


module.exports = mongoose('Job_Post', JobPostSchema);