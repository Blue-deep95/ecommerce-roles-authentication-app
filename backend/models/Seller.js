const mongoose = require("mongoose")

const sellerSchema = mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:String,
    otp:String,
    otpExpiry:Number,
    isEmailVerified:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default:"seller"
    }
})

module.exports = mongoose.model("seller",sellerSchema)