const express = require("express")
const userRoute = express.Router()
const signUpController = require("../controller/signupcontroller")

userRoute.post("/signUpUser", signUpController.sinUp)
userRoute.post("/login", signUpController.login)
userRoute.post("/forgetPassword", signUpController.forgetPassword)
userRoute.post("/resetPassword/:verificationCode", signUpController.resetPassword)
// userRoute.post("/verifyPassword/:verificationCode", signUpController.verificationcodeController)



module.exports = userRoute