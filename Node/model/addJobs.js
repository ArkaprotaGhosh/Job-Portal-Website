const mongoose = require("mongoose")

const addJobsSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    companyWebsiteLink: {
        type: String,
        required: true
    },
    jobRole: { type: String, trim: true, required: true },
    location: { type: String, require: true },
    salary: { type: String, required: true },
    skills: { type: String, required: true },
    experience: { type: String, required: true },
    contactEmail: { type: String },
    companyApplyWebsiteLink: { type: String, required: true },
    jobDescription: {
        type: String
    },
    admin_Info: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "adminlogincollations"
    },
    added_by: {
        type: mongoose.Schema.Types.ObjectId
    }

})
const addJobsModel = mongoose.model("addjobs", addJobsSchema)
module.exports = addJobsModel