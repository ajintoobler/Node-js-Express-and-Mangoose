// grab the things we need
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/customer')
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    username: { type: String },
    password: { type: String }
});
// var userSchema = new Schema({
//     testid: { type: Number }
// });

var userDetails = new Schema({
    name: { type: String },
    address: { type: String },
    phone: { type: Number },

});


// the schema is useless so far
// we need to create a model using it
var UserLogin = mongoose.model('userlogin', userSchema);
var UserDetail = mongoose.model('userdetails', userDetails);


// make this available to our users in our Node applications
module.exports.UserLogin = UserLogin;
module.exports.UserDetail = UserDetail;
