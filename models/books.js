const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const BookInfoSchema = new Schema({
    Code: {
        type: String,
        required: true,
        unique: true
    } ,
    Name: String,
    Author: String,
    Amount: Number,
    Subjected: String,
    Description: String,
    pathImage: String
});

const BookInfo = mongoose.model('BookInfo',BookInfoSchema);
module.exports = BookInfo;