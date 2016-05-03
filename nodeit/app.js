var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();

// Set up the templating engine.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Log console output and HTTP requests to the STDOUT and STDERR.
app.use(logger('dev'));

// Middleware that allows processing of forms.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Middleware that allows processing of cookies.
app.use(cookieParser());

// Make everything in the /public folder accessible to everyone.
// E.g. if there is a file foo.txt in /public it can be accessed by anyone at localhost:3000/foo.txt
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// Catch 404 and forward to appropriate error handler.
app.use(function (request, response, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Development error handler.
// Will print error message and stack trace.
if (app.get('env') === 'development') {
    app.use(function (err, request, response, next) {
        response.status(err.status || 500);
        response.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Production error handler.
// Displays an error message to the user but doesn't show stack trace.
app.use(function (err, request, response, next) {
    response.status(err.status || 500);
    response.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
