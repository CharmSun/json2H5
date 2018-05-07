var pageView = require('./page.ejs');
var loader = require('./loader');

var page = {
    // 页面渲染
    init: function(pageData) {
        this.render(pageData);
    },

    render: function(pageData) {
        var self = this;
        loader.init(function () {
            $('#container').html(pageView(pageData));

            self.swiper = new Swiper('.swiper-container', {
                direction: 'vertical',
                pagination: {
                    el: '.swiper-pagination',
                },
                on:{
                    init: function(){
                        swiperAnimateCache(this); //隐藏动画元素
                        swiperAnimate(this); //初始化完成开始动画
                    },
                    slideChangeTransitionEnd: function(){
                        swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
                    }
                }
            });
            // 事件操作
            // eventHandler.init();
            // 音视频操作
            // mediaHandler.init();
        });
    }
};

module.exports = page;