const mongoose = require('mongoose')

const categorieSchema = new mongoose.Schema({
    name:{type:String , required:true},
    description:{type:String,required:true},
    subCategories:[ {type:mongoose.Schema.Types.ObjectId,
        ref:'subCategorie'}],
       

})


module.exports=mongoose.model('categorie' , categorieSchema)