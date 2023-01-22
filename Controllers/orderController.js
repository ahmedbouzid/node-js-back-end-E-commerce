const orderModel=  require('../Models/orderModel')




module.exports=({

create:async (req , res)=>{
    try {
        const order = new orderModel (req.body)
        order.save(req.body, (err , item)=>{
            if (err){
                res.status(400).json({succes:false , message:"creation Failed" , err})
            }else { res.status(200).json({succes:true , message :"creation order succuffuly" , data:item})}
        })
    } catch (error) {
        console.log(error)
    }
},
getAll: async (req , res)=>{
    try {
        orderModel.find({}).exec((err , item)=>{
            if (err){
            {res.status(400).json({succes:false,message:"Failed to geted all the orders" , err})}
        }else {res.status(200).json({succes:true, message:"Succes" , data:item})}
        })

    } catch (error) {
        console.log(error)
        
    }
},
update: async (req , res)=>{
    try {
        orderModel .findByIdAndUpdate(req.params.id ,req.body ,{new:true}).exec((err , item )=>{
            if (err){
                res.status(400).json({succes:false , message:"failed" , err})
            }else { res.status(200).json({succes:true,message:"get all product" , data:item})}
        })
    } catch (error) {
        console.log(error)
    }
},
delete:async (req , res)=>{
    try {
        orderModel.findByIdAndDelete(req.params.id).exec((err)=>{
            if (err){
            res.status(400).json({succes:true,message:"delete Failed" , err})
        }else { res.status(200).json({succes:true,message:"delete succufully"})}
        })
    } catch (error) {
        console.log(error)
        
    }
},
getId: async (req , res)=>{
    try {
        orderModel.findOneAndDelete(req.params.id).exec((err , item )=>{
            if (err){
            res.status(400).json({succes:false, message:"failed too get order" , err})
                }else { res.status(200).json({succes:true , message:"order geted " , data:item})}
        })
    } catch (error) {
        console.log(error)
    }
}

})