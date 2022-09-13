const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const routes = {
  companies: require("./companies"),
  freelancers: require("./freelancers"),
  job_posts: require("./job_posts"),
  resumes: require("./resumes")
};

// to pass tests at the moment
router.get("/", (req, res) => {
  res.json({ message: "Welcome to your DIT342 backend ExpressJS project!" });
});
// import /api/* routes
Object.entries(routes).forEach(([key, value]) => router.use(`/${key}`, value));



//Catch all non-error handler for api (i.e., 404 Not Found)
router.use("/*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// error handling middleware
// router.use((err, req, res, next) => {
//   console.log("you've hit error handling middleware");
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || "error";
//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
//   });
// });

module.exports = router;