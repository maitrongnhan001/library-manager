const book = require('../models/books.js');
const user = require('../models/users.js');
const borrowBookInfo = require('../models/borrowBook.js');
module.exports = (req, res) => {
    //find book with code
    book.findOne({
        Code: req.params.code
    }, (err, bookInfo) => {
        let amount = bookInfo.Amount - req.body.Amount;
        //check amount > 0
        if(amount > 0) {
            book.findOneAndUpdate({
                Code: req.params.code
            }, {
                Amount: amount
            },(erro, bookInfoUpdate) => {
                //find user with req.session.userEmail
                user.findOne({
                    Email: req.session.userEmail
                }, (error, userInfo) => {
                    Name = userInfo.Name;
                    Scmnd = userInfo.Scmnd;
                    //create infomation borrow book
                    borrowBookInfo.create({
                        ...req.body,
                        CodeBook: req.params.code,
                        NameBook: bookInfo.Name,
                        pathImage: bookInfo.pathImage,
                        Name: Name,
                        Email: req.session.userEmail,
                        Scmnd: Scmnd
                    }, (errorr, borrowInfo) => {
                        res.redirect('/user');
                    });
                });
            });
        }else{
            //else then send borrowBook with message "Amount is not invalid"
            res.render('borrowBook',{
                Book: bookInfo,
                message: "Amount is invalid"
            });
        }
    });
}