module.exports = (req, res) => {
    //return page borrow book with massages
    res.render('borrowBookWithCode',{
        messageCode: "",
        message: ""
    });
}