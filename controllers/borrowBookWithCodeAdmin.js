module.exports = (req, res) => {
    //return page borrow book with massages
    res.render('borrowBookWithCodeAdmin', {
        messageCode: "",
        messageEmail: "",
        message: ""
    });
}