const borrows = require('../models/borrowBook.js');

module.exports = (req, res) => {
    //find all infomation of conllection borrowBook
    borrows.find({}, (err, borrowInfo) => {
        res.render('borrowingAdmin', {
            BorrowInfo: borrowInfo
        });
    });
}