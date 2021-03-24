const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/user')
const router = new express.Router();

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb){
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

function checkFileType(file, cb){

    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }

  const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('file');

router.post('/register', upload, async (req, res) => {
   
    try{
        const {userName, fullName, email, password, retypedPassword} = req.body;

        console.log(req.body);

        if(password === retypedPassword){
            const user = new User({
                userName, fullName, email, password
            })
           
            await user.save();
            console.log('Saved');
            res.status(201).json({
                "status": "registered"
            })
        } 
        else{
            res.status(400).json({
                "error" : "password do not match"
            })
        }

    } catch(e) {
        res.status(400).send(e)
    }
})

module.exports = router;