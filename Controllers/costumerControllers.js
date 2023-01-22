const costumerModel = require('../Models/costumerModel')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c33de12665e6a4",
      pass: "daa90134f3b182"
    }
  });
module.exports=({
 registre: async (req , res)=>{       
        const salt = bcrypt.genSalt(10)
        const hash = bcrypt.hashSync(
            req.body.password,
            parseInt(salt)
        )
        const Costumer = new costumerModel({
   
            password:hash,
           ...req.body,
            verificationCode:crypto.randomBytes(8).toString('hex'),
            verifyUser:false,           
            image:req.body["image"]=
            req.files.length<=0 
            ?[]
            :req.files.map((file)=>{
            return {name:file.filename, description :"add pictures"}
            })
        })
        await Costumer.save(req.body,(err, item)=>{
            if (err){

                res.status(400).json({status:false, message:"Failed",err})
            } else {
                transport.sendMail({
                    from:"myname@gmail.com",
                    to:item.email,
                    subject :"Welcome"+ item.name,
                    html:`<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>welcome</title>
                    </head>
                    <body>
                        <h1>Welcome ${item.name} Thanks to registre on</h1>
                        <h1>Gmail ${item.email}</h1>
                        <a href="http://localhost:4440/auth/verifyNow/${item.verificationCode}"> verify your EMail</a>
                    </body>
                    </html>` 
                })
                
                res.status(200).json({status:true , message:"registre succufuly", data:item})}
        })

    },
    getAll:async(req,res)=>{
        try {
          await costumerModel.find({}).exec((err,item)=>{
          if (err) {
             res.status(400).json({ success:false, message:"failed", err})
          }else{
              res.status(200).json({success:true,message:"success",data:item })
          }
      })
    }   catch (error) {
          res.status(400).json({ success:false, message:"failed", err})
        }}
        ,
        getName:async(req,res)=>{
            try {
     
             await  costumerModel.find({name:req.query.name}).exec((err,item)=>{
               if(err){
                  res.status(400).json({
                   succes:false ,
                   message:"failed",
                   err
                   })
               }else{
                   res.status(201)
               .json({
                   succes:true,
                   message:'succes',
                   data:item
               })
               }
           })
     
            } catch (error) {
             res.status(400).json({
               succes:false ,
               message:"failed",
               err
               })
            }
       },
       getId:async(req,res)=>{
        try {
         await costumerModel.findById(req.params.id).exec((err,item)=>{
           if (err){
               res.status(400)
               .json({succes:false , message:"failed",err })
           } else {
               res.status(201)
               .json({ succes:true, message:'get by id',data:item })
           }
       })
        } catch (error) {
         res.status(400).json({succes:false, message:"failed",err})
        }
    
   
   },
   update:async (req,res)=>{
    try {
      await costumerModel.findByIdAndUpdate(req.params.id,req.body,
        {new:true,})
         .exec((err,item)=>{
           if(err){
            res.status(400).json({succes:false,message:"failed",err})
           }else{
          res.status(201).json({succes:true, message:"succes",data:item})
           }
        })
    } catch (error) {
      res.status(400).json({succes:false, message:"failed",err})
    }
  },
    delete:async (req , res)=>{
        costumerModel.findByIdAndDelete(req.params.id).exec((err)=>{
            if (err){
                res.status(400).json({succes:false , message:"Failed" , err})
            }else { res.status(200).json({succes:true, message:"delete succufully"})}
        })
    }
})