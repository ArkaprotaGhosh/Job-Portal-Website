const express = require("express")
const app = express()
app.use(express.json())
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
app.use(cors())
const bodyParser = require('body-parser');
app.use(bodyParser.json())
//-----------routers-------------\\
const signUpRouter = require("./router/signuproute")
const addJobRouter = require("./router/jobRouters")
const addadminsignupRouter = require("./router/adminSignupRouter")

require("./db")
const port = process.env.PORT || 5009
app.use("/api/user", signUpRouter)
app.use("/api/addjob", addJobRouter)
app.use("/api/adminsignup", addadminsignupRouter)


app.listen(port, () => {
    console.log(`the databse is connected at ${port}`);
})

