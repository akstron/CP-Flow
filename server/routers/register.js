const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/user')
const router = new express.Router();

/*Setting up multer*/

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

  const msgs = []; 

  try{
      const {userName, fullName, email, password, retypedPassword} = req.body;
      
      if(!userName || !fullName || !email || !password || !retypedPassword){
        msgs.push('Fields not completed!');

        return res.json({
          "status": false,
          msgs
        })
      }

      if(password === retypedPassword){
          const user = new User({
              userName, fullName, email, password
          })
          
          await user.save();

          msgs.push("Registration Completed")
        
          res.status(201).json({
              "status": true,
              msgs
          })
      } 
      else{
          msgs.push("Password do not match!");

          res.json({
              "status": false,
              msgs
          })
      }

  } catch(e) {
      msgs.push("Credentials already exist!");
      
      res.json({
        "status": false,
        msgs
      })
  }
})

module.exports = router;