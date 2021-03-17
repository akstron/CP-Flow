const express = require('express');
const User = require('../models/user')
const router = new express.Router();

router.post('/register', async (req, res) => {
   
    try{
        // const {userName, fullName, email, password, retypedPassword} = req.files.formFields;
        console.log(req.files.formFields);
        console.log(req.body.formFields);

        // if(password === retypedPassword){
        //     const user = new User({
        //         userName, fullName, email, password
        //     })
        //     console.log(req.body);
        //     await user.save();
        //     console.log('Saved');
        //     res.status(201).json({
        //         "status": "registered"
        //     })
        // } 
        // else{
        //     res.status(400).json({
        //         "error" : "password do not match"
        //     })
        // }

    } catch(e) {
        res.status(400).send(e)
    }
})

module.exports = router;