const { render } = require('ejs');
const books = require('../models/books.js');
module.exports = (req, res) => {
    books.find({}, (error, bookInfo) => {
        res.render('home', {
            Books: bookInfo
        });
    });
};