const mongoose = require("mongoose")
require("dotenv").config()


const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected")
    }
    catch(err){
        console.log("Error while connecting DB",err)
    }
}

module.exports = connectDB