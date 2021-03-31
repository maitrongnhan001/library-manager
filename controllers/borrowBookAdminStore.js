const book = require('../models/books.js');
const user = require('../models/users.js');
const borrowBookInfo = require('../models/borrowBook.js');
const { render } = require('ejs');
module.exports = (req, res) => {
    //find user with email
    user.findOne({
        Email: req.body.Email
    }, (err, userInfo) => {
        //check user is exist
        if (!userInfo) {
            //find book with code
            return book.findOne({
                Code: req.params.code
            }, (error, bookinfo) => {
                //return information of book
                res.render('borrowBookAdmin', {
                    Book: bookinfo,
                    messageEmail: "Email is not exist",
                    message: ""
                });
            });
        }
        //amount > 0
        if (req.body.Amount > 0) {
            book.findOne({
                Code: req.params.code
            }, (error, bookinfo) => {
                //check amount
                amount = bookinfo.Amount - req.body.Amount;
                if (amount >= 0) {
                    book.findOneAndUpdate({
                        Code: req.params.code
                    }, {
                        Amount: amount
                    }, (erro) => {
                        Name = userInfo.Name;
                        Scmnd = userInfo.Scmnd;
                        //create infomation borrow book
                        borrowBookInfo.create({
                            ...req.body,
                            CodeBook: req.params.code,
                            NameBook: bookinfo.Name,
                            pathImage: bookinfo.pathImage,
                            Name: Name,
                            Email: req.body.Email,
                            Scmnd: Scmnd
                        }, (errorr, borrowInfo) => {
                            res.redirect('/admin');
                        });
                    });
                } else {
                    //amount < 0
                    return res.render('borrowBookAdmin', {
                        Book: bookinfo,
                        messageEmail: "",
                        message: "Amount is invalid"
                    });
                }
            });
        } else {
            //find information book
            book.findOne({
                Code: req.params.code
            }, (error, bookinfo) => {
                return res.render('borrowBookAdmin', {
                    Book: bookinfo,
                    messageEmail: "",
                    message: "Amount is invalid"
                });
            });
        }
    });
}