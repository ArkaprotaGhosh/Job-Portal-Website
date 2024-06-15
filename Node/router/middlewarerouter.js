const express=require("express")
const middlewarerouter= express.Router()
const middleware=require("../middleware/middleware")

middlewarerouter.get("/getnote",middleware.auth)