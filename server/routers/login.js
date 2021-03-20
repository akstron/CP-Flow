const express = require('express');
const passport = require('passport');
const router = new express.Router();

router.post('/login' , (req, res, next) => {
    console.log('loginRouter')

    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/error'
    })(req, res, next);
 
    // res.send('done')
});

module.exports = router;