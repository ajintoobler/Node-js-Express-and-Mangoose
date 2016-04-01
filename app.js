/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routers'),
    session = require('express-session'),
    auth = require('./routers/auth'),
    users = require('./routers/users');


var app = module.exports = express.createServer();
app.use(session({ secret: 'ssshhhhh' }));
// Configuration

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(session({ resave: true, saveUninitialized: true, secret: 'uwotm8' }));
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));

});

app.configure('development', function() {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
    app.use(express.errorHandler());
});



// Use the session middleware
module.exports = function(app) {

    app.get('/', isAuthenticated, function(req, res) {
        res.render('home');

    });

};


function isAuthenticated(req, res, next) {


    if (req.session.data)

    {
        return next();
        console.log(req.session.user);
    } else {

        // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
        res.redirect('index');
    }

}
//session destroy
app.get('/logout', function(req, res) {

    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log(req.session);
            console.log("logout sucessfull");
            res.redirect('/');
        }
    });

});

// Routes
app.get('/', routes.admin);
app.get('/loginuseradd', routes.loginuseradd);
app.post('/loginuserinsert', routes.loginuserinsert);
app.get('/home', routes.index);
app.post('/test', auth.login);
app.get('/home', isAuthenticated, routes.home);
app.get('/insert', isAuthenticated, routes.insert);
app.get('/view', isAuthenticated, routes.view);
app.get('/edit', isAuthenticated, routes.update);
app.post('/delete', isAuthenticated, routes.deleteuser);
app.get('/update', isAuthenticated, routes.updatedetails);
app.listen(3100, function() {
    console.log("Express server listening on port 3100 in %s mode");
});
