const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        require: true, 
        trim: true
    }, 
    fullName: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Invalid email!')
            }
        }
    },
    password: {
        type: String,
        required: true,  
        trim: true,
        minlength: 7,
    },
}, {
    timestamps: true
})

/*Passoword hashing is performed in middleware, just before 'save' */

// userSchema.pre('save', async function(next) {
//     const user = this

//     if(user.isModified('password')){
//         user.password = await bcrypt.hash(user.password, 8)
//     }
//     next()
// })

const User = mongoose.model('User', userSchema)

module.exports = User
