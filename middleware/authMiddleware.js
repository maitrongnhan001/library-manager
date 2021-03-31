const User = require('../models/users.js');
module.exports = (req, res, next) => {
    let email = req.session.userEmail;
    User.findOne({
        Email: email
    }, (error, user) => {
        console.log(email);
        if (error || !user)
            return res.redirect('/#contact');
        next();
    });
}