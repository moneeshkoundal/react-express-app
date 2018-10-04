var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Request = require("request");
/*var indexRouter = require('./routes/index');
var articlesRouter = require('./routes/articles');
var articledetails = require('./routes/articles');
*/

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*app.use('/', indexRouter);
app.use('/articles', articlesRouter);
app.use('/articleview/:id', articledetails);
*/

// An api endpoint that returns a short list of items
app.get('/articles', function(req, res, next) {

    var url = "http://localhost:8888/drupal-8.6.1/rest/card-list/?_format=json";

    /* Calling json api and send data */
    Request.get(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
        let articlesObj = JSON.parse(body);
        console.log(articlesObj);
        var result = [];
        for(var myKey in articlesObj) {
            result.push({id:articlesObj[myKey]['nid'][0]['value'],title: articlesObj[myKey]['title'][0]['value'], body: articlesObj[myKey]['body'][0]['value'], image: articlesObj[myKey]['field_card_image'][0]['url']});
        }
        res.json(result);

    } else {
        console.log("Got an error: ", error, ", status code: ", response.statusCode)
    }
});

});

/* GET article page. */
app.get('/articleview/:id', (req, res, next) => {
    var card_id = req.params.id;
    console.log(card_id);
/* Calling json api and send data */
  Request.get("http://localhost:8888/drupal-8.6.1/rest/card-list/"+card_id+"?_format=json", (error, response, body) => {
    if (!error && response.statusCode === 200) {
    let articlesObj = JSON.parse(body);
    console.log(articlesObj);
    var result = [];
    for(var myKey in articlesObj) {
        result.push({id:articlesObj[myKey]['nid'][0]['value'],title: articlesObj[myKey]['title'][0]['value'], body: articlesObj[myKey]['body'][0]['value'], image: articlesObj[myKey]['field_card_image'][0]['url']});
    }
    res.json(result);

} else {
    console.log("Got an error: ", error, ", status code: ", response.statusCode)
}
});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
