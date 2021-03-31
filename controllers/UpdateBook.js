const books = require('../models/books.js');

module.exports = (req, res) => {
    //find one with code book
    books.findOne({
        ...req.body
    }, (error, bookInfo) => {
        //if code book is invalid
        if(bookInfo == null) {
            return books.find({}, (err, booksInfo) => {
                res.render('admin', {
                    Books: booksInfo,
                    message: "Code is not exist"
                });
            });
        }
        //find success
        res.render('updateBook', {
            Book: bookInfo,
            message: ""
        });
        //store code, use in update store
        code = req.body;
    });
}