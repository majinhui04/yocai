/* app config */
(function(){
    var noop = function (){};
    window.console = window.console || { log:noop,warn:noop };
    var dir = getRootPath();
    // 网站地址
    var url = dir + '/index.html';
    // 图片地址
    var imgUrl = './';

    /* 微信 */
    // 微信分享地址
    var shareUrl = url;
    // 微信分享的图片路径
    var shareImgUrl = dir + '/images/share.png';
    // 微信分享标题
    var shareTitle = '';
    // 微信分享描述
    var shareContent = '';
    // 微信appid 传媒梦工场
    var appid = 'wx9c8b0d9821a73d73';

    window.App = {
        dir:'./',
        share : {
            appid:appid,
            lineLink:shareUrl,
            imgUrl:shareImgUrl,
            title:shareTitle,
            content:shareContent
        }
    };


    // 获取站点根目录
    function getRootPath() {
        var strFullPath = window.document.location.href;
        var strPath = window.document.location.pathname;
        var pos = strFullPath.indexOf(strPath);
        var prePath = strFullPath.substring(0, pos);
        var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
        return (prePath + postPath);
    }


})();