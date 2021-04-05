const multer = require('multer');
const { v4 } = require('uuid');
const path = require('path');

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

  module.exports = upload;