const user = require('../models/users.js');
const books = require('../models/books.js');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
    const {Email , Password} = req.body;
    //find all books and callback with "boookInfo"
    books.find({}, (erro, bookInfo) => {
        //find one with Email
        user.findOne({
            Email: Email
        }, (error, userInfo) => {
            if(userInfo) {
                //if user exist then check password
                bcrypt.compare(Password, userInfo.Password, (err, same) => {
                    if(same) {
                        req.session.userEmail = userInfo.Email;
                        //check: user is admin or user
                        if(userInfo.Admin === "Admin"){
                            res.redirect('/admin');
                        }else{
                            res.redirect('/user');
                        }
                    }
                });
            //user is not exist
            }else{
                res.render('home', {
                    Books: bookInfo,
                    message: "Email or password in invalid"
                });
            }
        });
    });
}