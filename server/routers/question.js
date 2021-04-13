const express = require('express');
const router = new express.Router();
const Question = require('../models/Question');

router.get('/questions', async (req, res) => {
   
    try{
        const questions = await Question.find({});
        res.status(200).json({
            status: true,
            questions});
    } catch(e) {
        console.log(e);
        res.status(404).send();
    }   
})

module.exports = router;
