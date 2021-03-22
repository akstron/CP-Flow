const express = require('express');
const passport = require('passport');
const router = new express.Router();

router.post('/login' , (req, res, next) => {
    console.log('loginRouter')

    passport.authenticate('local', (err, user, info) => {
        if (err) { 
            return res.status(500).json({
                "status": false,
                "msg": "Sever error! Please try again"
            })
        }

        if (!user) {
            return res.json({
                "status" : false, 
                "msg": "Email not registered"
            }); 
        }

        req.logIn(user, (err) => {
          if (err) {
               return res.status(500).json({
                   "status": false,
                   "msg": "Server error! Please try again"
               }); 
            }

            console.log(req.user);

          return res.status(202).json({
                "user": req.user,
                "status": true,
                "msg": "Logged in successfully!"              
          })
        });
      })(req, res, next);

});

module.exports = router;