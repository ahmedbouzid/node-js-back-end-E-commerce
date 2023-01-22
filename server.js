
const express =require("express")
const db=require('./config/db')
const app=express()
const dotenv=require("dotenv")


const cors = require('cors')

app.use(cors())

const PORt=process.env.PORT
const {error,success}=require("consola")
app.use(express.json())

//const bodyParser = require('body-parser');
//app.use(bodyParser.json());
const providerRouter=require('./routers/providerRouter')
app.use('/provider' , providerRouter)
const costumerRouter = require('./routers/costumerRouter')
app.use('/costumer' , costumerRouter)
const categorieRouter=require('./routers/categorieRouter')
app.use('/categorie' ,categorieRouter)
const subCategorieRouter =require('./routers/subCategoryRouter')
app.use('/subCategorie' , subCategorieRouter )

const autRouter=require('./routers/authRouter')
app.use('/auth' , autRouter)

const productRouter= require('./routers/productRouter')
app.use('/product' , productRouter)
const orderRouter=require('./routers/orderRouter')
app.use('/order' , orderRouter)

app.get('/getImage/:img' , function(req , res){
    res.sendFile(__dirname+'/storages/' + req.params.img)
})




app.listen(PORt,()=>{ 

    success({message:`server Started PORT ${PORt}`, badge:true})
})