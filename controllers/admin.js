const books = require('../models/books.js');
module.exports = (req, res) => {
    books.find({}, (error, bookInfo) => {
        //aad book and add message to <span> in class Code
        res.render('admin', {
            Books: bookInfo,
            message : ""
        });
    });
}