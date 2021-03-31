const path = require('path');
const Book = require('../models/books');

module.exports = (req, res) => {
    let image = req.files.image;
    //store image in foder Books
    image.mv(path.resolve(__dirname, '../public/assets/img/Books', image.name), (err) => {
        //add book's information to database
        Book.create({
            ...req.body,
            pathImage: '/assets/img/Books/' + image.name
        }, (err) => {
            //error when code is duplicate
            if(err)
            {
                return res.render('addBook',{
                    message: "Code is exist"
                });
            }
            //add book is success
            res.redirect('/admin');
        });
    });
};