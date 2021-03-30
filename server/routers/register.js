const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/user')
const router = new express.Router();
const fs = require('fs');
const { v4 } = require('uuid');

const storage = multer.diskStorage({
    destination: '../client/public/uploads/',
    filename: function(req, file, cb){
      cb(null, v4() + path.extname(file.originalname));
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
    }, 
  }).single('file');

router.post('/register', upload, async (req, res) => {

  const msgs = []; 
  console.log(req.file);

  try{
      const {userName, fullName, email, password, retypedPassword} = req.body;
      
      if(!userName || !fullName || !email || !password || !retypedPassword){
        msgs.push('Fields not completed!');

        deleteProfilePicture(req.file);

        return res.json({
          "status": false,
          msgs
        })
      }

      if(password === retypedPassword){
        var absolutePath = "";
        if(req.file) absolutePath = `/uploads/${req.file.filename}`;
          const user = new User({
              userName, fullName, email, password, 
              profilePicture: absolutePath
          })
          
          await user.save();

          console.log(user);

          msgs.push("Registration Completed")
        
          res.status(201).json({
              "status": true,
              msgs
          })
      } 
      else{
          msgs.push("Password do not match!");
          deleteProfilePicture(req.file);

          res.json({
              "status": false,
              msgs
          })
      }

  } catch(e) {
      msgs.push("Credentials already exist!");
      console.log(e);

      res.json({
        "status": false,
        msgs
      })
  }
})

const deleteProfilePicture = (file) => {
  if(!file) return;
  fs.unlinkSync(file.path);
}

module.exports = router;