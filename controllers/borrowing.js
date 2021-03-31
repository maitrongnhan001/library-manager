const borrows = require('../models/borrowBook.js');

module.exports = (req, res) => {
    borrows.find({
        Email: req.session.userEmail
    }, (err, borrowInfo) => {
        res.render('borrowing', {
            BorrowInfo: borrowInfo
        });
    });
}