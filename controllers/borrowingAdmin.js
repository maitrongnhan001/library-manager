const borrows = require('../models/borrowBook.js');

module.exports = (req, res) => {
    borrows.find({}, (err, borrowInfo) => {
        res.render('borrowingAdmin', {
            BorrowInfo: borrowInfo
        });
    });
}