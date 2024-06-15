const mongoose = require("mongoose");


const adminLoginSchema = new mongoose.Schema({
    adminname: {
        type: String,
        // trim:true,
        // required:true
    },
    email: {
        type: String,
        trim:true,
        required:true,
        unique:true
    },
    password: {

        type: String,
        // trim:true,
        // required:true
    },
    phoneNo: {
        type: String,
        required: true
    },
    verificationCode: {
        type: String
    },
    extraVerificationCode: {
        type: String
    }
})

const adminLoginCollation = mongoose.model("adminlogincollations", adminLoginSchema)

module.exports = adminLoginCollation