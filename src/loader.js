
var loader = {
    init: function(callback, timeout){
        this.imgList = [];
        this.callback = typeof callback === 'function' && callback;
        this.timeout = timeout || 3000;
        $('#container').html('<div class="loading"><div class="progress-wrap"><div class="progress"></div></div></div>');
        this.getImgList();
        this.preload();
    },

    // 获取图片列表
    getImgList: function () {
        // 遍历页对象中有图片的
        var self = this;
        for (var i = 0; i < pageData.pages.length; i++) {
            pageData.pages[i].background.backgroundImage && self.imgList.push(pageData.pages[i].background.backgroundImage);  // 存入图片
            $.each(pageData.pages[i].component, function (id, element) {
                if (element.type === 'image') {
                    self.imgList.push(element.src);  // 存入图片
                } else if (element.type === 'view') {
                    element.style.backgroundImage && self.imgList.push(element.style.backgroundImage);  // 存入图片
                }
            });
        }
    },

    showPercentage: function(percentage) {
        $('#container').find('.progress').css('width', percentage + '%');
    },

    preload: function () {
        var len = this.imgList.length,
            loaded = 0,
            self = this,
            callback = this.callback;

        if (!len) {
            self.showPercentage( 100 );
            // 执行页面业务
            setTimeout(function() {
                callback && callback();
            }, 350);
        }
        for (var i = 0; i < len; i++) {
            var img = new Image();
            img.onerror = img.onload = function() {
                if(loaded < len ){
                    loaded++;
                    self.showPercentage( Math.floor(loaded / len * 100) );
                }
                if(loaded === len){
                    setTimeout(function() {
                        callback && callback();
                    }, 350);
                }
            };
            img.src = this.imgList[i];
        }

        /**
         * 如果timeout * len时间范围内，仍有图片未加载出来，通知外部环境所有图片均已加载
         * 目的是避免用户等待时间过长
         */
        setTimeout(function () {
            if(loaded < len ){
                self.showPercentage( 100 );
                setTimeout(function() {
                    callback && callback();
                }, 350);
            }
        }, self.timeout * len);

    }
};

module.exports = loader;