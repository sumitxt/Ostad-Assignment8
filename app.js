const express=require('express');
const router= require('./src/routes/api')
require("dotenv").config({path:'config.env'});
const app= new express()


//Security Middleware//

const rateLimit= require('express-rate-limit')
const helmet=require('helmet')
const mongoSanitize=require('express-mongo-sanitize')
const xss=require('xss-clean')
const hpp=require('hpp')
const cors=require('cors')


//DATABASE Lib Import
const mongoose=require('mongoose')


//Security Middleware Import
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(express.json());

//Request Rate Limit
const limiter=rateLimit({windowsMe:15*60*1000,max:3000})
app.use(limiter)

//MongoDB connection string

const URI=process.env.URI
const OPTION={user:process.env.USER,pass:process.env.PASS}

mongoose.connect(URI,OPTION,(error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("Connected successfully")
    }
})

//Routing Implement
app.use("/api/v1",router)

//Undefined Routing Implementation
app.use("*",(req,res)=>{
    res.status(404).json({status:"Failed",data:"Not Found"})
})


module.exports=app