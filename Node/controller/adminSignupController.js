"use strict";

const AdminLogin = require("../model/adminsignupschema")
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NODE_API"



//--------------sign up------------------\\
exports.sinUpAdmin = async (req, res) => {

    // console.log("====",req);



    try {
        const { adminname, email, password, phoneNo } = req.body
        const existingAdmin = await AdminLogin.findOne({ email: email });
        // console.log("=========>",existingAdmin);
        if (existingAdmin) {
            return res.send({
                status: 400,
                message: "Admin Already Exist"
            })
        }



        const hashePassword = await bcrypt.hash(password, 10);
        // console.log("=======>",hashePassword);
        const result = await AdminLogin.create({
            adminname: adminname,
            password: hashePassword,
            email: email,
            phoneNo: phoneNo,
        })
        // console.log("result===>",result);

        const token=jwt.sign({email:result.email,
        id:result._id},SECRET_KEY)
        return res.send({
            success: true,
            status: 200,
            message: "SinUp Successfull",
            data: result,
            token:token
        })


    } catch (error) {
        return res.send({
            success: false,
            status: 500,
            message: "Internal Server Error",
            error: error.message
        })

    }
}

//------------------login-----------------\\

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const existingAdmin = await AdminLogin.findOne({ email: email })
        if (!existingAdmin) {
            return res.send({
                status: 404,
                message: "Admin does not found"
            })
        }
        // console.log("email--------------",existingAdmin);
        const matchPassword = await bcrypt.compare(password, existingAdmin.password)
        if (!matchPassword) {
            return res.send({
                status: 400,
                message: "Invalid Password"
            })
        }
        // console.log("matchemail--------------",existingAdmin._id);
        
            const token = jwt.sign({ email: existingAdmin.email, id: existingAdmin._id }, SECRET_KEY)
            return res.send({
                success: true,
                status: 202,
                message: "admin Login Successfull",
                data: existingAdmin,
                token: token

            })
      
       
        
        

    } catch (err) {
        return res.send({
            success: false,
            status: 500,
            message: "Internal Error",
            error: err.message
        })
    }
    console.log("matchemail--------------",matchProfession);
}


//----------------random string generator--------------------\\

const randomStringGeneratior = (length) => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const charactersLength = characters.length
    let counter = 0

    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
        counter += 1
    }
    return result;

}


//--------------------forget password---------------------------\\
exports.forgetPassword = async (req, res) => {
    try {
        const { email } = req.body
        const existingAdmin = await AdminLogin.findOne({ email: email })
        if (existingAdmin == undefined) throw "Please enter your email"
        if (!existingAdmin) throw "enter the valid Email Id"
        const response = await AdminLogin.findOneAndUpdate({ email: email },
            { $set: { verificationCode: randomStringGeneratior(10) }, extraVerificationCode: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) },
            { new: true })

        return res.send({
            success: true,
            status: 200,
            data: response
        })

    } catch (err) {
        return res.send({
            success: false,
            status: 500,
            message: "Internal Error",
            error: err.message
        })
    }

}

//-----------verify code-----------------\\

exports.verificationcodeController = async (req, res) => {
    try {
        // const { newPassword, confirmPassword } = req.body
        const verificationCode = req.params.verificationCode
        const verify = await AdminLogin.findOne({ verificationCode: verificationCode })
        // if (newPassword === confirmPassword) {
        // if (verify == null) throw "Invalid Admin"
        // if (verify.verificationCode < new Date(new Date().getTime())) throw "Expire Code"
        // const reponse = await AdminLogin.findOneAndUpdate({ _id: verify._id }, { $set: { password: newPassword }, $unset: { verificationCode: 1, extraVerificationCode: 1 } })
        return res.send({
            success: true,
            status: 200,
            message: "correct verification code",
            data: verify

        })
    } catch (err) {
        return res.send({
            success: false,
            status: 500,
            message: "Internal Error",
            error: err.message
        })
    }
}
//---------------reset Password-----------------------\\

exports.resetPassword = async (req, res) => {
    try {
        const { newPassword, confirmPassword } = req.body
        const verificationCode = req.params.verificationCode
        const verify = await AdminLogin.findOne({ verificationCode: verificationCode })
        if (newPassword === confirmPassword) {
            if (verify == null) throw "Invalid Admin"
            if (verify.verificationCode < new Date(new Date().getTime())) throw "Expire Code"
            const reponse = await AdminLogin.findOneAndUpdate({ _id: verify._id }, { $set: { password: newPassword }, $unset: { verificationCode: 1, extraVerificationCode: 1 } })
            console.log("response-----------------------", reponse);
            return res.send({
                success: true,
                status: 200,
                message: "Password Reset Successfully",
                data: reponse
            })
        }
        else {
            return res.send({
                success: false,
                message: "password doesn't Match"
            })
        }
    } catch (err) {
        console.log("error---------------------======", err.message);
        return res.send({
            success: false,
            status: 500,
            message: "Internal Error",
            error: err.message
        })
    }
}