const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const userInfoSchema = new Schema({
    Email: {
        type: String,
        require: true,
        unique: true
    },
    Name:{
        type: String,
        require: true
    },
    Scmnd: {
        type: String,
        require: true,
        unique: true
    },
    Password: {
        type: String,
        require: true
    },
    Admin: String
});

userInfoSchema.pre('save', function (next) {
    const user = this
    bcrypt.hash(user.Password, 10, (error, hash) => {
        user.Password = hash;
        next();
    });
});
   

const user = mongoose.model('user', userInfoSchema);
module.exports = user;