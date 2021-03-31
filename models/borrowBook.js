const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const borrowBookInfoSchema = new Schema({
    Name: String,
    NameBook: String,
    pathImage: String,
    Email: String,
    Phone: String,
    Scmnd: String,
    CodeBook: String,
    Amount: Number
});

const borrowBookInfo = mongoose.model('borrowBookInfo',borrowBookInfoSchema);
module.exports = borrowBookInfo;