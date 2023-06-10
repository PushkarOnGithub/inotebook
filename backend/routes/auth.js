const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");


const JWT_SECRET = "helloU$er";

// Route1: Create a user using "/api/auth/createuser" NO login required.
router.post('/createuser',[
    body('name', "Invalid Name").isLength({min: 3}),
    body('email', "Invalid Email").isEmail(),
    body('password', "Invalid Password").isLength({min: 5})
],async (req, res) =>{
  // if there are errors, return Bad request and the errors
    const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  // Check weather the user with the email exists already.
  try{
  let user = await User.findOne({email: req.body.email});
  if(user){
    return res.status(400).json({"error": "Email already Registered"})
  }
  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password, salt);

  user = await User.create({
    name: req.body.name,
    password: secPass,
    email: req.body.email,
  })
  const data = {
    user:{
    id: user.id
    }
  }
  const authToken= jwt.sign(data, JWT_SECRET);

  res.json({authToken});
  }
  catch(error){
    console.error(error.message);
    res.status(500).json({"error": "some error occured"})
  }
})

// Route2: Authenticate a user using "/api/auth/login" | NO login required.
router.post('/login',[
    body('email', "Invalid Email").isEmail(),
    body('password', "Password Can not be blank").exists(),
],async (req, res) =>{
  // if there are errors, return Bad request and the errors
    const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const {email, password} = req.body;

  // Check weather the user with the email exists.
  try{
  let user = await User.findOne({email});
  if(!user){
    return res.status(400).json({"error": "1Incorrect Credentials"});
  }
  
  const passwordCompare = await bcrypt.compare(password, user.password);
  
  if(!passwordCompare){
    return res.status(400).json({"error": "2Incorrect Credentials"});
  }

  const data = {
    user:{
    id: user.id
    }
  }
  const authToken= jwt.sign(data, JWT_SECRET);

  res.json({authToken});
  }
  catch(error){
    console.log(error.message);
    res.status(500).json({"error": "Internal Server Error"});
  }
})

// Route3: Get the user logged in /api/auth/getuser | Login required.
router.post('/getuser',fetchuser,[
],async (req, res) =>{
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } 
  catch(error){
    console.error(error.message);
    res.status(500).json({"error": "Internal Server Error"});
  }
})

module.exports = router;