const mongoose=require("mongoose")

async function connectDb(){
    try {
        await mongoose.connect(process.env.db)
        console.log("Database is successfully connected")
    } catch (error) {
        console.log("Internal error",error)
    }

}
connectDb()