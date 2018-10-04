var express = require('express');
var Request = require("request");

var router = express.Router();
/* GET articles listing. */
router.get('/articles', function(req, res, next) {

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

module.exports = router;
