const providerModel = require('../Models/providerModel')
const bcrypt =require('bcrypt')
const jwt = require("jsonwebtoken")
const nodemailer= require('nodemailer');

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c33de12665e6a4",
      pass: "daa90134f3b182"
    }
  });
  const crypto = require('crypto')
  module.exports={
    
    register:async(req , res)=>{
        const salt= bcrypt.genSalt(10)
        const hash = await bcrypt.hashSync(
            req.body.password,
            parseInt(salt)
        )
        const Provider = new providerModel({
            name:req.body.name,
            email:req.body.email,
            password:hash,
            phones:req.body.phones,
            matricule:req.body.matricule,
            company:req.body.company,
            verificationCode:crypto.randomBytes(8).toString('hex'),
            verifyUser:false
        })

        await Provider.save(req.body,(err,item)=>{
            if (err){
                res.status(400).json({succes:false,message:"Failed",err})
            }else {
                transport.sendMail({
                    from:"myapp@gmail.com",
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
                res.status(200).json({succes:true,message:"succes",data:item})
            }
          

        })

    },


    getAll: async (req , res)=>{
        providerModel.find({}).exec((err,item)=>{
            if (err){
                res.status(400).json({status:false , message:"Failed",err})
            }else { res.status(200).json({status:true , message:"Valid" , data:item})}
        })
    },
  
    upadate:(req , res)=>{
        providerModel.findByIdAndUpdate(req.params.id , req.body ,{
            new:true,
        }).exec((err , item)=>{
            if (err){
                res.status(400)
                .json({
                    succes:false ,
                    message:"failed",
                    err,
                })
            }else {
                res.status(201).json({
                    succes:true ,
                    message:"success",
                    data:item,
                })
            }
        })
  },
  delete: async (req , res)=>{
    providerModel.findByIdAndDelete(req.params.id).exec((err)=>{
        if (err){
            res.status(400)
            .json ({
                succes:false ,
                message:"failed",
                err
            })
        } else {
            res.status(200)
            .json({
                succes:true,
                message:"delete succefully"
                
            })
        }
    })
},
getId:(req,res)=>{
    providerModel.findById(req.params.id).exec((err , item)=>{
        if (err){
            res.status(400).json({status:false , message:"Failed",err})
        }else { res.status(200).json({status:true , message:"Valid" , data:item})}

    })
},
getbyname: async (req , res )=>{
    providerModel.findOne({name: req.query.name}).exec((err , item)=>{

        if (err){
            res.status(400).json({succes:false,message:"error to get user" , err})
        } else { res.status(200).json({succes:true,message :"get succufilly" , data:item})}
    })
}
  
}