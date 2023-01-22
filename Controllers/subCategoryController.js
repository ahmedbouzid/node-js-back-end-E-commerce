const { json } = require('express')
const categorieModel = require('../Models/categorieModel')
const subCategorieModel= require('../Models/subCategorieModel')



module.exports={
  
create: async (req , res)=>{
    subCatgorie = new subCategorieModel(req.body)
    
    subCatgorie.save(req.body , (err , item )=>{
        if (err) {
            res.status(400).json({succes:false ,message:"Failed" , err})
        }else {res.status(200).json({succes:true , message:"creation succufully" , data :item})};
        

    })
    await categorieModel.findByIdAndUpdate(req.body.categorie, {$push:{subCategories:subCatgorie}})
},
getAll:(req , res)=>{
    subCategorieModel.find({}).exec((err, item)=>{
        if (err){
            res.status(400)
            .json({
                succes:false ,
                message:"failed",
                err
            })
        } else {
            res.status(201)
            .json({
                succes:true,
                message:'show all sub Categorie',
                data:item
            })
        }

    })
},
getByCategorie:  async (req , res)=>{
    let filterObject = {}
    if (req.params.categorie) filterObject={categorieModel : req.params.categorie}
    const subCategorie= await subCategorieModel.findById(req.params.categorie)
            res.status(201)
            .json({
                succes:true,
                message:'filter sub categorie by sub',
                data:subCategorie
            })
        },
getSubByCategorie : async (req , res)=>{
    try {
        
        const subCategorie = await subCategorieModel.find({ 
        categorie : req.query.categorie,
    })
   

    res.status(200)
    .json({message:"liste sub Cat" , data: subCategorie})



    } catch (error) {
      res.status(406).json({message:"error"})  
     

    }
}   ,  

    
update:(req , res)=>{
    subCategorieModel.findByIdAndUpdate(req.params.id , req.body ,{new:true}).exec((err ,item)=>{
        if (err){
            res.status(400)
            .json({
                succes:false ,
                message:"failed",
                err
            })
        } else {
            res.status(201)
            .json({
                succes:true,
                message:'show all sub Categorie',
                data:item
            })
        }
    })
},
delete: async (req , res)=>{
   /*  subCategorieModel.findByIdAndDelete(req.params.id ).exec((err )=>{
        if (err){
            res.status(400)
            .json({
                succes:false ,
                message:"failed",
                err
            })
        } else {
            res.status(201)
            .json({
                succes:true,
                message:'show all sub Categorie',
               
            })
        } 
    }) */
    try {
        const sub = await subCategorieModel.findByIdAndDelete({
            _id: req.params.id
        });
        await categorieModel.findByIdAndUpdate(sub.categorie,{
           $pull: {subCategories:sub._id}})
            res.status(201)
            .json({
                succes:true,
                message:'Delete succesfully',
               
            })
    } catch (error) {
        res.status(400)
            .json({
                succes:false ,
                message:"failed",
                error
            })
        
    }

    
},
getId: async (req, res)=>{
    subCategorieModel.findById(req.params.id).exec((err , item)=>{
        if (err){
            res.status(200).json({succes:false , message:"xx" , err})
        } else { res.status(200).json({succes:true , message:"Item geted by id" , data:item})}
    })
}

}