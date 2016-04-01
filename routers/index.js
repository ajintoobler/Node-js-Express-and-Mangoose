/*
 * db connection
 */

// var db = require('../config/db');
var userdetails = require('../models/user');


/*
 * GET home page.
 */
exports.index = function(req, res) {
    res.render('index');
};

exports.admin = function(req, res) {
    res.render('admin');
};
exports.loginuseradd = function(req, res) {
    res.render('loginuseradd');
};

exports.loginuserinsert = function(req, res) {
    var username = req.param('username');
    var password = req.param('password');
    var chris = new userdetails.UserLogin({
        username: username,
        password: password
    });
    chris.save(function(err) {
        if (err) throw err;
    });
    res.redirect('/home');
};

exports.home = function(req, res) {
    res.render('home');
};

exports.insert = function(req, res) {
    var name = req.param('customerName');
    var address = req.param('custAddress');
    var phone = req.param('custPhone');
    var chris = new userdetails.UserDetail({
        name: name,
        address: address,
        phone: phone
    });
    chris.save(function(err) {
        if (err) throw err;
    });
    res.redirect('/view');
};

exports.view = function(req, res) {
    userdetails.UserDetail.find({}, function(err, doc) {
        if (err) {
            console.log(err);
            throw err;
        }
        res.render('userdetailsview', { data: doc });
    })
};

exports.deleteuser = function(req, res) {
    var id = req.param('id');
    console.log(id);
    userdetails.UserDetail.findByIdAndRemove(id, function(err) {
        if (err) throw err;
        res.redirect('/view');
    });

};

exports.update = function(req, res) {
    var id = req.param('id');
    // console.log(id);
    userdetails.UserDetail.find({ _id: id }, function(err, doc) {
        if (err) throw err;

        res.render('edit', { data: doc });
    })
};

exports.updatedetails = function(req, res) {
    var id = req.param('id');
    // console.log(id);
    var name = req.param('username');
    var address = req.param('address');
    var phone = req.param('phone');

    userdetails.UserDetail.findByIdAndUpdate({ _id: id }, { name: name, address: address, phone: phone }, function(err, rows) {
      if (err) throw err;

      console.log(rows);

      res.redirect('/view');
  });

};
