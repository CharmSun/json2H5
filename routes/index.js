var express = require('express');
var router = express.Router();
var json = require('../data/data');

/* GET home page. */
router.get('/', function (req, res, next) {
    //根据appId 读取page JSON 数据

    console.log(json);
    res.render('index', {
        title: json.title,
        description: json.description,
        pageData: JSON.stringify(json)
    });
});

module.exports = router;
