const jwt = require("jsonwebtoken")
const SECRET_KEY="NODE_API"

// exports.auth = (req,res,next)=>{
//     try {
        
//         let token = req.headers["authorization"]
//         // console.log("token------------------",token);x
//         if(token){
//             token = token.split(" ")[1];
//             // console.log("tokenaaaaaaaaaaaaaaaaaa",token);
//             let user=jwt.verify(token,SECRET_KEY)
//             // console.log("user------------------",user);
//         }
//         else{
//             res.status(401).send({
//                 message:"unauthorised user"
//             })
//         }
    

//     } catch (error) {
//         res.status(401).send({
//             message:"unauthorised user"
//         })        
//     }
//     next()
// }

require('dotenv').config();
// const jwt = require('jsonwebtoken');
const AdminUser = require('../model/adminsignupschema');

exports.requireAuth = async (req, res, next) => {

    // Verify authentication
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' })
    };

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.SECRET_KEY);
        req.adminUser = await AdminUser.findOne({ _id }).select('_id');
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ error: 'Request is not authorized.' })
    }
};

