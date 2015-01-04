$(function(){

    // data-toggle="collapse"
    $(document).on('click','[data-toggle="collapse"]',function(e){
        var $target = $(e.currentTarget), 
            $parent = $target.parent(),
            id = $target.attr('data-href') || '',
            $content = id? $('#'+id):$parent.find('[data-role="content"]'),
            height = $content.height();

        
        // 若展开则收起
        if($target.hasClass('aria-expanded')) {
            $content.slideUp(400,function(){
                $content.addClass('collapse');
            });

        }else {
            //$content.removeClass('collapse');
            $content.slideDown(400,function(){});
        }
        $target.toggleClass('aria-expanded');


    });

    // 分享 data-role="share"
    /*
        新浪
        window.open('http://v.t.sina.com.cn/share/share.php?title='+encodeURIComponent(document.title)+'&url='+encodeURIComponent(location.href)+'&source=bookmark','_blank');void(0)
        QQ
        window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=23&url='+encodeURIComponent(document.location.href))
    */
    
    $(document).on('click','[data-role="qqzone"]',function(e){
        window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title='+encodeURIComponent(document.title)+'&url='+encodeURIComponent(document.location.href),'_blank');
    });
    $(document).on('click','[data-role="sina"]',function(e){
        window.open('http://v.t.sina.com.cn/share/share.php?title='+encodeURIComponent(document.title)+'&url='+encodeURIComponent(location.href)+'&source=bookmark','_blank');
    });
    $(document).on('click','.share-item-weixin',function(e){
        $('.share-weixin-qrcode').show();
    });
    $(document).on('click','.share-weixin-qrcode',function(e){
        e.stopPropagation();
        $('.share-weixin-qrcode').hide();
    });
    $(document).on('click','[data-role="share"]',function(e){
        // '<div class="share-weixin-qrcode"><img src="./assets/images/微信二维码.png" class="share-weixin-qrcode"></div>'+
        var content = '<div class="share-container">'+
                        '<div class="share-list">'+
                            '<a class="share-item share-item-weixin" href="javascript:;">'+
                                '<img src="./assets/images/weixin-logo.jpg" alt="" class="share-item-img">'+
                                '<p class="share-item-title">朋友圈</p>'+
                                '<img src="./assets/images/微信二维码.png" class="share-weixin-qrcode">'+
                            '</a>'+
                            '<a class="share-item share-item-qqzone" href="javascript:;" data-role="qqzone">'+
                                '<img src="./assets/images/qqzone-logo.jpg" alt="" class="share-item-img">'+
                                '<p class="share-item-title">QQ空间</p>'+
                            '</a>'+
                            '<a class="share-item share-item-weibo" href="javascript:;" data-role="sina">'+
                                '<img src="./assets/images/weibo-logo.jpg" alt="" class="share-item-img">'+
                                '<p class="share-item-title">新浪微博</p>'+
                            '</a>'+
                        '</div>'+ 
                        
                    '</div>';

        var dialog = new QAQ.Dialog({
            id          : 'ishare',//选填dialog的id
            //cls         : '.x1 .x2',dialog的类
            title       : "把状态分享到",
            content     : content,
            width       : 420,//选填
            modal       : false, //是否显示遮罩
            drag        : false,//是否可拖拽
            winResize   : false//浏览器缩放时是否重新定位
        });


    });

});
