const user = require('../models/users.js');
const book = require('../models/books.js');
const borrow = require('../models/borrowBook.js');
const { findOneAndUpdate } = require('../models/users.js');

module.exports = (req, res) => {
    //find book with code
    book.findOne({
        Code: req.body.Code
    }, (err, bookInfo) => {
        //if don't find code in book information
        if(!bookInfo) {
            return res.render('borrowBookWithCodeAdmin', {
                messageCode: "Code is not exist",
                messageEmail: "",
                message: ""
            });
        }
        let amount = bookInfo.Amount - req.body.Amount;
        //check amount > 0
        if(amount > 0 || req.body.Amount <= 0) {
            //fint user with email
            user.findOne({
                Email: req.body.Email
            }, (erro, userInfo) => {
                //check user is exist
                if(!userInfo){
                    return res.render('borrowBookWithCodeAdmin', {
                        messageCode: "",
                        messageEmail: "Email is not exist",
                        message: ""
                    });
                }
                //update amount
                book.findOneAndUpdate({
                    Code: req.body.Code
                }, {
                    Amount: amount
                }, (error) => {});
                //find name user and scmnd
                Name = userInfo.Name;
                Scmnd = userInfo.Scmnd;
                //create data to database
                borrow.create({
                    ...req.body,
                    CodeBook: req.body.Code,
                    NameBook: bookInfo.Name,
                    pathImage: bookInfo.pathImage,
                    Name: Name,
                    Scmnd: Scmnd
                }, (error, borrowInfo) => {
                    res.redirect('/admin');
                })
            });
        }else{
            //else then send borrowBook with message "Amount is not invalid"
            res.render('borrowBookWithCodeAdmin',{
                messageCode: "",
                messageEmail: "",
                message: "Amount is invalid"
            });
        }
    });
}