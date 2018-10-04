var express = require('express');
var Request = require("request");

var router = express.Router();

/* GET article page. */
router.get('articleview/:id', (req, res, next) => {
    var id = req.params.id;
    /* Calling json api and send data */
    Request.get("http://localhost:8888/drupal-8.6.1/rest/card-list/"+id+"?_format=json", (error, response, body) => {
    if (!error && response.statusCode === 200) {
    let articlesObj = JSON.parse(body);
    console.log(articlesObj);
    var result = [];
    for(var myKey in articlesObj) {
        result.push({id:articlesObj[myKey]['nid'][0]['value'],title: articlesObj[myKey]['title'][0]['value'], body: articlesObj[myKey]['body'][0]['value'], image: articlesObj[myKey]['field_card_image'][0]['url']});
    }
    req.result = result;

} else {
    console.log("Got an error: ", error, ", status code: ", response.statusCode)
}
});
});

module.exports = router;