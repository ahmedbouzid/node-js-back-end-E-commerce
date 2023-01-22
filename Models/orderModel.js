const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    Qte:{type:Number,required:true},
    price:{type:Number , required:true},
    product:{ type:mongoose.Schema.Types.ObjectId,
                ref:"products"}
})

module.exports=mongoose.model('order' , orderSchema)