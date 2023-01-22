const  mongoose = require('mongoose')

const galerieSchema = mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String , required:true}
})
const productSchema = mongoose.Schema({
    
    reference:{type:String , required:true},
    Qte :{type:Number , required:true},
    price:{type:Number , required:true},
    galeries:[galerieSchema],
    orders:[{
        type:mongoose.Types.ObjectId,
        ref: "order",
     }],
    subCategorie:{type:mongoose.Schema.Types.ObjectId,
    ref:"subCategorie"}
})

module.exports = mongoose.model('product' , productSchema)