const express = require("express")
const adminRoute = express.Router()
const adminSignupController = require("../controller/adminSignupController")

adminRoute.post("/signUpadmin", adminSignupController.sinUpAdmin)
adminRoute.post("/login", adminSignupController.login)
adminRoute.post("/forgetPassword", adminSignupController.forgetPassword)
adminRoute.post("/resetPassword/:verificationCode", adminSignupController.resetPassword)
adminRoute.post("/verifyPassword/:verificationCode", adminSignupController.verificationcodeController)



module.exports = adminRoute