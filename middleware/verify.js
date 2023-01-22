/* 
const jwt = require("jsonwebtoken")

testToken= async (req,res,next)=>{
     try {
          
    JWT_SECRET='iamtryingtoaddsome'
    const token = req.headers['authorization']
    if(!token) return res.status(401).json({message :'Unauthorize user'})

          
         jwt.verify(token, JWT_SECRET , (err , decoded )=>{
        
          if (err){
                return res.status(401).json({message :'Unauthorize user'})
               

          }
          req.user = decoded
          next()
         })
       
     } 
        catch (error) {
          
    
    res.status(400).json('Token not valid') }
   
} */
const jwt=require("jsonwebtoken")
const JWT_SECRET="iamtryingtoaddsome"

check_auth=async(req,res, next)=>{
    try { 
        const token=req.headers['authorisation']
        if(!token){
            return res.status(400).json({message:"No Token"});
        }
       jwt.verify(token, JWT_SECRET, (err,decoder)=>{
        if(err){
            return res.status(400).json({message:"auth Failed"});  
        }
        req.user=decoder;
        next();
       }) 
    } catch (error) {
        return res.status(400).json({message:"error", error})
    }
}
module.exports=check_auth

