const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const usersSchema = Schema({
    email: String,
    name: String,
    phone: Number,
    password: String,
});

const users = mongoose('users', usersSchema);
module.exports = users;