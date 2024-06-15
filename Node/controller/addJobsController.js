const service = require("../service/addJobsService")
const mongoose = require("mongoose")
const model = require("../model/addJobs")

//---------create Data--------\\
const createJobController = async (req, res) => {
    try {
        const body = req.body
        // const newBody=(body)
        console.log(body);
        const createjobsData = await service.createJobs(body)
        // console.log(createjobsData);
        return res.send({
            success: true,
            status: 200,
            message: "the jobs is added successfully",
            data: createjobsData
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
//----------get users by job role search---------\\
const getJobControllerSearch = async (req, res) => {
    try {
        const jobRole = req.query.jobRole
        // const role = RegExp(jobRole)
        if (!jobRole) {
            return res.send({
                success: false,
                status: 400,
                message: "Error: Job Role is required in the query parameters."
            });
        }
        //  console.log(jobRole);

        const getjobsDataID = await model.find({ jobRole:{$regex: jobRole, $options: "i"} });
        console.log("getjobsDataID--------------->", getjobsDataID);

        return res.send({
            success: true,
            status: 200,
            message: "Data retrieved successfully",
            data: getjobsDataID
        });
    } catch (err) {
        return res.send({
            success: false,
            status: 500,
            message: "Internal Error",
            error: err.message
        })
    }
}




//-------------get all user list-----------\\
const getallJobDataController = async (req, res) => {
    try {

        const response = await service.getAllJobs()
        return res.send({
            success: true,
            status: 200,
            message: "get all jobs data successfull",
            data: response
        })
    } catch (error) {
        return res.send({
            success: false,
            status: 500,
            message: "Internal Error",
            error: error.message
        })
    }
}

//-----------------get jobs by admin--------------\\
const getAdminJobDataController = async (req, res) => {
    try {
        const adminInfo = req.params.admin_Info
        // console.log("admin----------------",adminInfo);
        if (!adminInfo) {
            return res.send({
                success: false,
                status: 500,
                message: " Error admin Info not present",
                error: error.message
            })
        }
        const response = await model.find({ admin_Info: req.params.admin_Info })

        // console.log("response----------------",response);
        if (response === null) {
            return res.send({
                success: false,
                status: 500,
                message: " Error admin Info data is getting",
                error: error.message
            })

        }
        return res.send({
            success: true,
            status: 200,
            message: "get all jobs data successfull",
            data: response
        })
    } catch (error) {
        return res.send({
            success: false,
            status: 500,
            message: "Internal Error",
            error: error.message
        })
    }
}

//--------Populate----------\\
const getManyjobDataControllerPopulate = async (req, res) => {
    try {
        const id = req.params.id
        const getjobsData = await service.getjobsByIdPopulate(id)
        return res.send({
            success: true,
            status: 200,
            message: "get all jobs data successfull",
            data: getjobsData
        })
    } catch (error) {
        return res.send({
            success: false,
            status: 500,
            message: "Internal Error",
            error: error.message
        })

    }
}


//--------------update job data-------------\\
const updateJobs = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const updateResponse = await service.updateJobsService(id, body)
        return res.send({
            success: true,
            status: 200,
            message: "data Updated Successfully",
            data: updateResponse
        })
    } catch (error) {
        return res.send({
            success: false,
            status: 500,
            message: "Internal error",
            error: error.message
        })
    }
}
//----------get by id job ---------\\
const getJobByIdController = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const updateResponse = await service.getJobsById(id, body)
        return res.send({
            success: true,
            status: 200,
            message: "Get data for Updated Successfully",
            data: updateResponse
        })
    } catch (error) {
        return res.send({
            success: false,
            status: 500,
            message: "Internal error",
            error: error.message
        })
    }
}

//-------------delete job data--------------\\

const deleteJobsController = async (req, res) => {
    try {
        const id = req.params.id
        const deleteResponse = await service.delateJobsService(id)
        return res.send({
            success: true,
            status: 200,
            message: "data deleted Successfully",
            data: deleteResponse
        })
    } catch (error) {
        return res.send({
            success: false,
            status: 500,
            message: "Internal error",
            error: error.message
        })
    }
}


//-----------------search-----------------\\
const getData = async (req, res) => {
    try {
        const id = req.body.id;
        let { pageNo, pageSize } = req.query;
        pageNo = parseInt(pageNo);
        pageSize = parseInt(pageSize);

        const limit = pageSize || 0,
            page = pageNo || 1;

        console.log("page11111111111111==>", pageNo);
        console.log("page22222222222==>", pageSize);

        let query = {};
        console.log("searchQuaer===>", req.query);

        // const searchData =Object.keys(req.query).filter(i =>{
        //    req.query[i] !== 'pageNo'||'pageSize'});
        if (req.query.pageNo || req.query.pageSize) {
            delete req.query.pageNo;
            delete req.query.pageSize;
        }
        const searchData = req.query;

        console.log("searchData++++++++++++++++++++++", searchData);
        if (searchData.title || searchData.description) {
            console.log("searchData.title+++++++++", searchData.title);

            searchData.title = new RegExp(searchData.title, "i");
            searchData.description = new RegExp(searchData.description, "i");
        }
        console.log("searchData====>", searchData);

        if (searchData) {
            query = {
                $or: [
                    { ...searchData } // Use the regex pattern here
                ]
            };
        }

        console.log("query===>", query);

        const searchgameData = await gameCollection
            .find(query)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ _id: -1 });

        console.log("searchgameData=======>", searchgameData);

        //  const gameIds = searchgameData.map((game) => game.user_ID);
        //  const usersData = await userCollation.find({ _id: { $in: gameIds } });
        //  console.log("usersData==>",usersData);

        const gameResultCount = await gameService.countGameData();

        return res.send({
            success: true,
            status: 200,
            message: "Fetch Successfull",
            count: gameResultCount,
            data: searchgameData,

            searchData: searchgameData
        });
    } catch (error) {
        console.log("error", error);
        return res.send({
            success: false,
            status: 500,
            message: "Internal Server Eroor",
            error: error.message
        });
    }
};
module.exports = { createJobController, getJobControllerSearch, getAdminJobDataController, getManyjobDataControllerPopulate, updateJobs, deleteJobsController, getJobByIdController, getallJobDataController, getData }