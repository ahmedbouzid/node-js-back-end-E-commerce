const mongoose = require('mongoose')

const subCategorieSchema = mongoose.Schema({
    name:{ type:String , required :true},
    description:{type:String,required:true},
    categorie: {
        type: mongoose.Schema.ObjectId,
        ref: 'categorie',
        required: true
      },
      products:[ {type:mongoose.Schema.Types.ObjectId,
        ref:'product'}],   

})
module.exports=mongoose.model('subCategorie', subCategorieSchema)