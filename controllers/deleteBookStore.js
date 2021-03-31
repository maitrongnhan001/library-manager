const books = require('../models/books');

module.exports = (req, res) => {
    books.findOneAndDelete({
        ...req.body
    }, (error, bookInfo) => {
        if(bookInfo == null){
            //Code is false
            return res.render('deleteBook',{
                message: "Code is not exist"
            });
        }
        res.redirect('/admin');
    });
}