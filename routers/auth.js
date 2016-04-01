//login
//var db = require('../config/db');

// var collection = db.userlogin;
var User = require('../models/user');

exports.login = function(req, res) {
    var userName = req.body.username;
    var password = req.body.password;


    User.UserLogin.findOne({ "username": userName }, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data.password);
            // data.forEach(function(user) {
            if (data.password == password) {
                console.log("Login sucessfull");
                var sess = req.session.data = userName;
                res.render('home');
                res.end();
            } else {
                res.redirect('/home', { session: sess });
            }

        }
    });

};
