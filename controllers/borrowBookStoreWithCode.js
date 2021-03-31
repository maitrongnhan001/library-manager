const book = require('../models/books.js');
const user = require('../models/users.js');
const borrowBookInfo = require('../models/borrowBook.js');
module.exports = (req, res) => {
    //find book with code
    book.findOne({
        Code: req.body.Code
    }, (err, bookInfo) => {
        //if don't find code in book information
        if(!bookInfo) {
            return res.render('borrowBookWithCode',{
                Book: bookInfo,
                messageCode: "Code is not exist",
                message: ""
            });
        }
        let amount = bookInfo.Amount - req.body.Amount;
        //check amount > 0
        if(amount > 0) {
            book.findOneAndUpdate({
                Code: req.body.Code
            }, {
                Amount: amount
            },(erro, bookInfoUpdate) => {
                //find user with req.session.userEmail
                user.findOne({
                    Email: req.session.userEmail
                }, (error, userInfo) => {
                    //find name user and scmnd
                    Name = userInfo.Name;
                    Scmnd = userInfo.Scmnd;
                    //create infomation borrow book
                    borrowBookInfo.create({
                        ...req.body,
                        CodeBook: req.body.Code,
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
            res.render('borrowBookWithCode',{
                Book: bookInfo,
                messageCode: "",
                message: "Amount is invalid"
            });
        }
    });
}