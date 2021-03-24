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
}, {
    timestamps: true
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question
