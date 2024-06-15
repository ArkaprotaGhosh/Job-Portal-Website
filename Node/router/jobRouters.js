const express = require("express")
const JobRouter = express.Router();
const JobController = require("../controller/addJobsController")
const middleware = require("../middleware/middleware")




JobRouter.post("/createJob", JobController.createJobController)
JobRouter.get("/getJobbyjobRole", JobController.getJobControllerSearch)


JobRouter.get("/getallAdminjob/:admin_Info", JobController.getAdminJobDataController)
JobRouter.get("/getalljob", JobController.getallJobDataController)
JobRouter.get("/getalljobpopulate/:id", JobController.getManyjobDataControllerPopulate)
JobRouter.put("/updateJobData/:id", JobController.updateJobs)
JobRouter.get("/getJobdetailsbyId/:id", JobController.getJobByIdController)
JobRouter.delete("/deleteJobData/:id", JobController.deleteJobsController)
module.exports = JobRouter