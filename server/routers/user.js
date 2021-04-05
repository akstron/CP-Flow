const express = require('express');
const router = new express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const User = require('../models/user');
const upload = require('../config/multer');
const fs = require('fs');
const path = require('path');

router.get('/isLoggedIn', ensureAuthenticated, (req, res) => {
    res.status(202).json({
        user: req.user,
        status: true,
        msg: "authorized"
    })
})

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

router.patch('/edit', upload, ensureAuthenticated, async (req, res) => {
    
    try{
        const previousProfilePicture = req.user.profilePicture;
        if(req.file) {
            const absolutePath = `/uploads/${req.file.filename}`;
            req.body.profilePicture = absolutePath; 
        }

        await User.findByIdAndUpdate(req.user._id, req.body);

        fs.unlinkSync(path.join(__dirname, '../../client/public' , previousProfilePicture));

        res.status(200).json({
            status: true, 
            msg: "Updated!"
        })
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }
});

router.get('/question/:questionId', async (req, res) => {

    try{
        const question = await Question.findById(req.params.questionId);

        await question.populate({
            path: 'userId'
        }).execPopulate();

        await question.populate({
            path: 'answersId'
        }).execPopulate();

        let isLiked = false;

        if(req.user !== undefined){
            if(question.likedBy.find((userId) => {
                return (userId).toString() === (req.user._id).toString();
            })){
                isLiked = true;
            }
        }

        res.json({question, isLiked});
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

        let isLiked = false;

        if(req.user !== undefined){
            if(answer.likedBy.find((userId) => {
                return (userId).toString() === (req.user._id).toString();
            })){
                isLiked = true;
            }
        }

        res.status(200).json({answer, isLiked});
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

router.patch('/question/like', ensureAuthenticated, async (req, res) => {

    try{
        const question = await Question.findById(req.body.questionId);

        if(req.body.option === "increment"){
            question.likedBy.push(req.user._id);
            await question.save();
        } 
        else {
            const newLikedBy = question.likedBy.filter((userId) => {
                return (userId).toString() !== (req.user._id).toString();
            })

            question.likedBy = newLikedBy;
            await question.save();
        }

        res.status(200).json({
            question
        })

    } catch(e) {
        console.log(e);
        res.status(500).json({
            "status": false
        })
    }
})


router.patch('/answer/like', ensureAuthenticated, async (req, res) => {

    try{
        const answer = await Answer.findById(req.body.answerId);

        if(req.body.option === "increment"){
            answer.likedBy.push(req.user._id);
            await answer.save();
        } 
        else {
            const newLikedBy = answer.likedBy.filter((userId) => {
                return (userId).toString() !== (req.user._id).toString();
            })

            answer.likedBy = newLikedBy;
            await answer.save();
        }

        res.status(200).json({
            answer
        })

    } catch(e) {
        console.log(e);
        res.status(500).json({
            "status": false
        })
    }
})

module.exports = router;