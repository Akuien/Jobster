const express = require("express");
const router = express.Router();
const authController = require("../authController/authController");
const auth = require("../config/auth")



router.post("/register", authController.registerNewCompany);
router.post("/login", authController.loginCompany);
router.get("/me", auth,authController.getCompanyDetails);


module.exports = router;

