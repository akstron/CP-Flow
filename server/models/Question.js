const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true, 
        ref: 'User'
    }, 
    question: {
        type: String,
        require: true,
        trim: true
    },
    answersId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question
