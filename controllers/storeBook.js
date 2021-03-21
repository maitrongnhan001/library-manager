const path = require('path');
const Book = require('../models/books');

module.exports = (req, res) => {
    let image = req.files.image;
    console.log(req.body);
   image.mv(path.resolve(__dirname, '../public/assets/img/Books', image.name), (err) => {
       Book.create({
           ...req.body,
           pathImage: '../assets/img/Books/' + image.name
       }, (err) => {
           if(err)
           {
               return res.render('addBook',{
                   message: "Code is exist"
               });
           }
           res.redirect('/admin');
       });
   });
};