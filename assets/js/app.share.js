(function(){
    var App = window.App || ( window.App = {} );
    var share = App.share || ( App.share = {} );

     
    // 微信分享显示的缩略图
    var imgUrl = share.ImgUrl ||  './images/share.png';
    // 微信分享链接的地址
    var lineLink = share.lineLink || window.location.href;
    // 微信分享标题
    var shareTitle = share.title || "";
    // 微信分享简介
    var descContent = share.content || '';
    // 微信分享发布者
    var appid = share.appid || 'wx9c8b0d9821a73d73';

    
    function shareFriend() {
        WeixinJSBridge.invoke('sendAppMessage',{
            "appid": window.App.share.appid,
            "img_url": window.App.share.imgUrl || imgUrl,
            "img_width": "200",
            "img_height": "200",
            "link": window.App.share.lineLink || lineLink,
            "desc": window.App.share.content || descContent,
            "title": window.App.share.title || shareTitle
        }, function(res) {
            //_report('send_msg', res.err_msg);
        })
    }
    function shareTimeline() {
        WeixinJSBridge.invoke('shareTimeline',{
            "img_url": window.App.share.imgUrl || imgUrl,
            "img_width": "200",
            "img_height": "200",
            "link": window.App.share.lineLink || lineLink,
            "desc": window.App.share.content || descContent,
            "title": window.App.share.title || shareTitle
        }, function(res) {
               //_report('timeline', res.err_msg);
        });
    }
    function shareWeibo() {
        WeixinJSBridge.invoke('shareWeibo',{
            "content": window.App.share.content || descContent,
            "url": window.App.share.lineLink || lineLink,
        }, function(res) {
            //_report('weibo', res.err_msg);
        });
    }

    // 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        // 发送给好友
        WeixinJSBridge.on('menu:share:appmessage', function(argv){
            shareFriend();
        });
        // 分享到朋友圈
        WeixinJSBridge.on('menu:share:timeline', function(argv){
            shareTimeline();
        });
        // 分享到微博
        WeixinJSBridge.on('menu:share:weibo', function(argv){
            shareWeibo();
        });
        
    }, false);


    $(document).on('click','[data-role="share"]',function(){
        $('.share-container').remove();
        $('body').append('<div class="share-container"></div>');
        $('.share-container').bind('click',function(){
            $(this).remove();
        });
    });

})();