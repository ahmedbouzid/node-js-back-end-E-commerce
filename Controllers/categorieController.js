const categorieModel=require('../Models/categorieModel')




module.exports={
    create: async (req , res)=>{
        const categorie = new categorieModel(req.body)
        await categorie.save(req.body , (err , item)=>{
            if (err){
            res.status(400).json({succes:false , message:"Failed to create", err})
        } else { res.status(200).json({succes:true , message:"Create succufully" , data: item})}
        })
    },
    getAll : async (req, res) => {
        try {
          const listCategories = await categorieModel.find({}).populate("subCategories");
          res.status(200).json({
            message: "list of categories",
            data: listCategories,
          });
        } catch (error) {
          res.status(400).json({
            msg: "error" + error.message,
          });
        }
      },
    upate:async (req , res )=>{
        categorieModel.findByIdAndUpdate(req.params.id , req.body,{new : true}).exec((err , item)=>{
            if (err){
                res.status(400).json({succes:false , message:"Failed to update", err})
            } else{res.status(200).json({succes:true , message:"update Succufilly" , data:item})}
        })
    },
    delete: async(req, res)=>{
        categorieModel.findByIdAndDelete(req.params.id).exec((err) =>{
            if(err){
                res.status(400).json({succes:false , message:"Failed to delete", err})
            }else { res.status(200).json({succes:true , message:"delete Succufilly"})}
        })
    },
    getById: async (req, res) =>{
        categorieModel.findById(req.params.id).exec((err ,item)=>{
            if(err){
                res.status(400).json({succes:true , message:'Failed to get id' , err})
            }else { res.status(200).json({succes:true , message:"item geted",data:item})}
        })
    }
}