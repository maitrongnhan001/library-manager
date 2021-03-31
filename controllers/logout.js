module.exports = (req, res) => {
    //delete cookie
    req.session.destroy(() => {
        res.redirect('/');
    });
}