var express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

module.exports = function () {
    var app = express();

// environment setting
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
}

app.use(bodyParser.urlencoded({
    extended: true
    }));

app.use(bodyParser.json());
app.use(methodOverride());

// view config
app.set('views', './app/views');
app.set('view engine', 'ejs');

//routes
app.use('/', require('../app/routes/index.server.routes.js'));

//use static file
app.use(express.static('./public'));
app.use(express.static('./node_modules'));

return app;
};