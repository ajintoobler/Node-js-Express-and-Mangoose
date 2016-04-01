//database connection using mangoose
// var mongoose = require('mongoose');
// var client=mongoose.connect('mongodb://localhost/customer');
// module.exports = client;

//mongodb connection method

var MongoClient = require('mongodb').MongoClient,
    format = require('util').format;
MongoClient.connect('mongodb://127.0.0.1:27017/customer', function(err, db) {
    if (err) {
        throw err;
    } else {
        console.log("successfully connected to the database");
        module.exports.userLogin = db.collection("userlogin");
        module.exports.userDetails = db.collection("userdetails")
    }
});

//other connection method

// var mongodb = require('mongodb');
// var Db = mongodb.Db;
// var Server = mongodb.Server;
// var client = new Db('mydb', new Server('localhost', 27017));
// client.open(function(error, client) {
//     if (error)
//         throw error;
// });
// module.exports = client;
