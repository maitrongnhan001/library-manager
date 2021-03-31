const { render } = require('ejs');
const books = require('../models/books.js');
module.exports = (req, res) => {
    books.find({}, (error, bookInfo) => {
        //aad book and add message to <span> on button submit
        res.render('home', {
            Books: bookInfo,
            message: ""
        });
    });
};