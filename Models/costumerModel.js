const mongoose = require('mongoose')
const userModel =require('./UserModel')

const gallerySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})
const costumerSchema = new mongoose.Schema({
    
    cin:{type:Number,required:true},
    city:{type:String, required:true},
    image:[gallerySchema],
    
})
const Costumers =userModel.discriminator('costumer' ,costumerSchema)
module.exports=mongoose.model("costumer")