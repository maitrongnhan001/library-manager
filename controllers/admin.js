const books = require('../models/books.js');
module.exports = (req, res) => {
    books.find({}, (error, bookInfo) => {
        res.render('admin', {
            Books: bookInfo
        });
    });
}