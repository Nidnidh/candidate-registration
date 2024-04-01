const express = require('express');
const bcrypt = require('bcrypt');
const Candidate = require('../models/candidate');

const router = express.Router();


const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};


router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Both username and password are required.' });
    }

   const candidate = await Candidate.findOne({ where:{email:email}});
   if(!candidate){
     
    return res.status(201).json({message:"user not found"});
   }
    
    res.status(201).json({message:"signin  sucessfully"});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error from backend' });
  }
});
router.post('/google-login', async (req, res) => {
  try {
    const  { email, name } = req.body; 
    const user = await Candidate.findOne({ where:{email:email}});
    if(!user){
      const newUser = await Candidate.create({
        email: email,
        name: name,
      });
      return  res.json({ success: true, message:"user sighned in sucessfully" });
    }
    else {
      res.json({ success: true, message:"user signed in" });
    }
      
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
