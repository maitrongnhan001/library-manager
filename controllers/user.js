const books = require('../models/books.js');

module.exports = (req, res) => {
    //find add book
    books.find({}, (error, bookInfo) => {
        res.render('user', {
            Books: bookInfo
        });
    });
}