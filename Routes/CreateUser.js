const express = require('express');
const router = express.Router() // calling it here
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const jwtSecret = "MynameisChetanBatra$12@$34$*"

router.post("/createuser" ,[
body('email').isEmail(),
body('name').isLength({min:5}),
body('password','Incorrect Passwrod').isLength({min:5})]
, async(req , res)=>{
  
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
   
  const salt = await bcrypt.genSalt(10);
  let securePassword = await bcrypt.hash(req.body.password , salt)
   try{
    await User.create({
        name:req.body.name,
        password:securePassword,
        email:req.body.email, 
        location:req.body.location
    })
   res.json({success:true})
   }catch(err){
    console.log(err);
    res.json({success:false})
   }
   
})

router.post("/loginuser" , [
  body('email').isEmail(),
  body('password','Incorrect Passwrod').isLength({min:5})] ,
   async(req , res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    let email = req.body.email;
     try{
    let userData =   await User.findOne({email});
     if(!userData){
      return res.status(400).json({ errors: "Wrong Email id , Try with correct email" });
     }
     const pwdCompare = await bcrypt.compare(req.body.password , userData.password);
     if(!pwdCompare){
      return res.status(400).json({ errors: "Wrong Password , Try with correct password" });
     } 
    
     const payloadData = {
      user:{
        id:userData.id
      }
     }
     const authToken = jwt.sign(payloadData , jwtSecret )
     return res.json({ success: true , authToken:authToken } );

        
    }catch(err){
      console.log(err);
      res.json({success:false})
     }
     
  })
module.exports = router;