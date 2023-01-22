const mongoose = require('mongoose')
const userModel = require('./UserModel')

const providerSchema= new mongoose.Schema({
    matricule:{type:String,required:true},
    company:{type:String,required:true},
    creatAt:{type:Date,default:Date.now}
    
})

const Provider =userModel.discriminator('provider',providerSchema)
module.exports = mongoose.model("provider")