const book = require('../models/books.js');
const path = require('path');

module.exports = (req, res) => {
    console.log(req.body);
    const image = req.files.image;
    //add image in foder Books
    image.mv(path.resolve(__dirname, '../public/assets/img/Books', image.name), (error) => {
        book.findOneAndUpdate(
            code, {
            ...req.body,
            pathImage: '/assets/img/Books/' + image.name
        }, (err, bookInfo) => {
            //success
            res.redirect('/admin');
        });
    });
}