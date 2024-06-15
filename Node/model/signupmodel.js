const mongoose = require("mongoose");


const userLoginSchema = new mongoose.Schema({
    username: {
        type: String,
        // trim:true,
        required: true
    },
    email: {
        type: String,
        // trim:true,
        required: true,
        // unique:true
    },
    phoneNo: {
        type: String,
        required: true
    },
    password: {

        type: String,
        // trim:true,
        required: true
    },
    profession: {
        type: String
    },
    verificationCode: {
        type: String
    },
    extraVerificationCode: {
        type: String
    }
})

const UserLoginCollation = mongoose.model("userlogincollations", userLoginSchema)

module.exports = UserLoginCollation