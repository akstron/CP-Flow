const express = require('express');
const passport = require('passport');
const router = new express.Router();

router.post('/login' , (req, res, next) => {
    console.log('loginRouter')
    const msgs = [];

    passport.authenticate('local', (err, user, info) => {
        if (err) { 
            msgs.push("Sever error! Please try again");
            return res.status(500).json({
                "status": false,
                msgs
            })
        }

        if (!user) {
            msgs.push("Email or password do not match");
            return res.json({
                "status" : false, 
                msgs
            }); 
        }

        req.logIn(user, (err) => {
          if (err) {
              msgs.push("Server error! Please try again");
               return res.status(500).json({
                   "status": false,
                   msgs
               }); 
            }

            msgs.push("Logged in successfully!");

          return res.status(202).json({
                "user": req.user,
                "status": true,
                msgs          
          })
        });
      })(req, res, next);

});

module.exports = router;