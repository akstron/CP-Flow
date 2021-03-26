const express = require('express');
const router = new express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Question = require('../models/Question');

router.post('/ask', ensureAuthenticated, async (req, res) => {

    try{
        const question = new Question({
            userId: req.user._id,
            question: req.body.question
        })
    
        await question.save();
    
        res.json({
           "user": req.user,
           "status": true 
        })
    } catch(e) {
        res.status(500).json({
            "status": false,
            "msg": "Server error!"
        })
    }

});

router.get('/profile', ensureAuthenticated, (req, res) => {
    res.status(200).json({
        "user": req.user,
        "status": true,
        "msg": "User found successfully!"
    });
})

router.get('/question/:questionId', /*ensureAuthenticated,*/ async (req, res) => {

    try{
        const question = await Question.findById(req.params.questionId);

        await question.populate({
            path: 'userId'
        }).execPopulate();

        res.json({question: question});
    } catch(e) {
        res.status(500).json({
            "status": false,
            "msg": "Internal server error!"
        })
    }
   
})

module.exports = router;