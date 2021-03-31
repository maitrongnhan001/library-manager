module.exports = (req, res) => {
    res.render('borrowBookWithCodeAdmin', {
        messageCode: "",
        messageEmail: "",
        message: ""
    });
}