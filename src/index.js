var page = require('./page');

if(process.env.NODE_ENV === "development"){
    window.pageData = require('../data/data');
}

// 页面初始化
page.init();