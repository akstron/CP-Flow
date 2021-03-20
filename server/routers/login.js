const express = require('express');
const passport = require('passport');
const router = new express.Router();

router.post('/login' , passport.authenticate('local', {}), (req, res) => {
    console.log('loginRouter')

    console.log(req.body);
    res.json(req.body);

});

module.exports = router;