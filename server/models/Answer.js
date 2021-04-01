const mongoose = require('mongoose')

const answerSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true, 
        ref: 'User'
    }, 
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Question'
    },
    answer: {
        type: String,
        require: true,
        trim: true
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer
