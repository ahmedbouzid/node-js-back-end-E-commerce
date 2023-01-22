const mongoose= require('mongoose')

const dotenv=require('dotenv').config()
const {success, error}=require('consola')
const db_url =process.env.db_url
const db=mongoose.connect(db_url,(err)=>{
    if (err){
        error({message:"unable to connect with the data base", badge:true})
    } else {
        success({message:"data base connection succefuly",badge:true}) 
    }
})