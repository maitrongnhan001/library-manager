const user = require('../models/users.js');

module.exports = (req, res) => {
    //add user
    user.create({
        ...req.body
    }, (error, userInfo) => {
        if(error){
            //aad book and add message to <span> on button submit
            return res.render('addUser',{
                message: "information is Invalid"
            });
        }
        res.redirect('/admin');
    });
}