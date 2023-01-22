const productModel = require('../Models/productModel')
const subCategorieModel = require("../Models/subCategorieModel")


module.exports = ({

    create: async (req, res) => {
        req.body["galeries"]=
        req.files.length<=0 
        ?[]
        :req.files.map((file)=>{
            return {name:file.filename, description :"add pictures"}
        })
        const product = new productModel(req.body)
        product.save(req.body , (err , item)=>{
            if (err){
            res.status(400).json({succes:false , message:"Failed to create", err})
        } else { res.status(200).json({succes:true , message:"Create succufully" , data: item})}
        })
        await subCategorieModel.findByIdAndUpdate(req.body.subCategorie, {$push:{products:product}})

    },
    getAll:async (req, res)=>{
        try {
            const listproduct = await productModel.find({}).populate("subCategorie");
      
            res.status(200).json({
              message: "list of products",
              data: listproduct,
            });
          } catch (error) {
            res.status(500).json({
              success: false,
              message: error,
              error,
            });
          }
        },
      
    updateGallerie:async(req,res)=>{
        try {
          req.body["galeries"]=
          req.files.length<=0
          ?[]
          :req.files.map((file)=>{
            return{name:file.filename ,description :"images ajoute" };
          });
          await productModel.findByIdAndUpdate(req.params.id ,req.body, 
            {new:true},).exec((err ,item )=>{
              if(err){
                res.status(400).json({success:false,message:"failed",err})
              }else{
                res.status(200).json({success:true,message:"success",data:item})
              }
            })
              
        } catch (error) {
          res.status(400).json({success:false,message:"failed" , error})
        }
      },
    update : async(req , res)=>{
       
        
        productModel.findByIdAndUpdate(req.params.id ,req.body ,{new:true}).exec((err , item )=>{
            if (err){
                res.status(400).json({succes:false , message:"failed" , err})
            }else { res.status(200).json({succes:true,message:"get all product" , data:item})}
        })
    },
    delete: async (req ,  res)=>{
       /*  productModel.findByIdAndDelete(req.params.id).exec((err)=>{
            if (err){
                res.status(400).json({succes:false , message:"failed" , err})
            }else { res.status(200).json({succes:true,message:"product deleted" })}

        }) */
        try {
          const product =await productModel.findByIdAndDelete
          ({_id:req.params.id});
          await subCategorieModel.findByIdAndUpdate
          (product.subCategorie,{
            $pull:{products:product._id}
          })
          res.status(200).json({
            succes:true,
            message:"delete"
          })
        } catch (error) {
          res.status(400).json({
            succes:false,
            message:"Failed"
          })
        }
    },
    getid: async (req , res)=>{
        productModel.findById(req.params.id).exec((err , item)=>{
            if (err){
                res.status(400).json({succes:false , message:"failed" , err})
            }else { res.status(200).json({succes:true,message:"research" , data:item })}
        })
    }
}

)
