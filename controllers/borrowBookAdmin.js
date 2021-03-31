const book = require('../models/books.js');
module.exports = (req, res) => {
    book.findOne({
        //code in url
        Code: req.params.code
    }, (error, bookInfo) => {
        //aad book and add message to <span> in class Amount
        res.render('borrowBookAdmin', {
            Book: bookInfo,
            messageEmail: "",
            message: ""
        });
    });
}