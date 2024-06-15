const mongoose=require("mongoose")
const model = require("../model/addJobs")
//---------create Data--------\\
const createJobs=async (body)=>{
    const createUserAdmin=new model({...body})
    return await createUserAdmin.save()
}
//----------get users by job role---------\\
const getJobsByjobRole=async (jobRole)=>{
    const getAdminData= await model.findById(jobRole)
    return getAdminData
}

//-------------get all admin job list by admin_Info-----------\\
const getAllJobs=async()=>{
    const response=await model.find({})
    return response
}

//--------Populate--------\\
const getJobsByIdPopulate=async (id)=>{
    const getAdminData= await model.findById(id).populate("admin_Info")
    return getAdminData
}
//----------get job by job id---------\\
const getJobsById=async (id)=>{
    const getAdminData= await model.findById(id)
    return getAdminData
}

//-----------------update Job details-----------\\
const updateJobsService=async (id,body)=>{
    const response=await model.findByIdAndUpdate(id,body,{new:true})
    return response
}

//----------------delete job details----------\\
const delateJobsService=async (id)=>{
    const response=await model.findByIdAndDelete(id)
    return response
}


module.exports={createJobs,getJobsByjobRole,getJobsByIdPopulate, updateJobsService, delateJobsService,getJobsById,getAllJobs}