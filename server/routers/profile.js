const express = require('express');
const router = new express.Router();
const { ensureAuthenticated } = require('../config/auth');

router.post('/profile', ensureAuthenticated, (req, res) => {
    res.status(200).json({
        "user": req.user,
        "status": true,
        "msg": "User found successfully!"
    });
})

module.exports = router;