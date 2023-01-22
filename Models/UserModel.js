const mongoose = require('mongoose')

const baseOptions = {
    discriminatorKey:"itemType",
    collection:"Users"
}
const userSchema = mongoose.Schema({
    name:{type:String , required:true},
    email:{type:String, required:true},
    password:{type:String,required:true},
    phones:{type:String,required:true},
    verificationCode:{type:String},
    
    verifyUser:{type:Boolean , default:false,}, //required:false
    isAdmin:{type:Boolean}

    
    
    
},baseOptions,
{timesTemps:true})
module.exports = mongoose.model('Users',userSchema)