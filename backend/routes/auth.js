const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Create a user using "/api/auth"
router.post('/',[
    body('name', "Invalid Name").isLength({min: 3}),
    body('email', "Invalid Email").isEmail(),
    body('password', "Invalid Password").isLength({min: 5})
],(req, res) =>{
    const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  User.create({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  }).then(user => res.json(user)).catch(err => console.log(err));
  res.json({error: "Enter a valid email"});
    // res.send(req.body);
})

module.exports = router;