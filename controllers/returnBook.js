const book = require('../models/books.js');
const borrow = require('../models/borrowBook.js');

module.exports = (req, res) => {
    borrow.findByIdAndDelete(req.params.id, (err, borrowInfo) => {
        book.findOne({
            Code: borrowInfo.CodeBook
        }, (error, bookInfo) => {
            book.findOneAndUpdate({
                Code: borrowInfo.CodeBook
            }, {
                Amount: bookInfo.Amount + borrowInfo.Amount
            }, (error, bookInfor) => {
                res.redirect('/admin/return');
            });
        });
    });
}