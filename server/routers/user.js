const express = require('express');
const router = new express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Question = require('../models/Question');
const Answer = require('../models/Answer');

router.post('/ask', ensureAuthenticated, async (req, res) => {

    try{
        const question = new Question({
            userId: req.user._id,
            question: req.body.question
        })
    
        await question.save();
        req.user.questions.push(question._id);
        await req.user.save();
    
        res.json({
           "status": true, 
           "msg": "Asked!" 
        })
    } catch(e) {
        res.status(500).json({
            "status": false,
            "msg": "Server error!"
        })
    }

});

router.get('/profile', ensureAuthenticated, async (req, res) => {

    await req.user.populate({
        path: "questions"
    }).execPopulate();

    await req.user.populate({
        path: "answers"
    }).execPopulate();

    res.status(200).json({
        "user": req.user,
        "status": true,
        "msg": "User found successfully!"
    });
})

router.get('/question/:questionId', async (req, res) => {

    try{
        const question = await Question.findById(req.params.questionId);

        await question.populate({
            path: 'userId'
        }).execPopulate();

        await question.populate({
            path: 'answersId'
        }).execPopulate();

        res.json({question});
    } catch(e) {
        res.status(500).json({
            "status": false,
            "msg": "Internal server error!"
        })
    }
})

router.get('/answer/:answerId', async (req, res) => {
    
    try{    
        const answer = await Answer.findById(req.params.answerId);

        res.status(200).json({answer});
    } catch (e) {
        console.log(e);
        res.status(500).json({
            "status": false, 
            "msg": "Internal server error!"
        })
    }
})

router.post('/answer', ensureAuthenticated, async (req, res) => {

    try{
        const answer = new Answer ({
            answer: req.body.answer,
            userId: req.user._id,
            questionId: req.body.questionId
        })

        await answer.save();
        req.user.answers.push(answer._id);
        await req.user.save();

        const question = await Question.findById(req.body.questionId);
        question.answersId.push(answer._id);
        await question.save();

        res.status(201).json({
            "status" : true, 
        })

    } catch(e) {
        console.log(e);
        res.json({
            "status": false
        })
    }
})

router.patch('/question/like', (req, res) => {

    console.log(req.body);
    res.send();
})

module.exports = router;