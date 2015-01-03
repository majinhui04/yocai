/* APP */
/*
    a 宗庆后：实业还是要做的，万一搞大了呢？
    b 汤唯：女神还是要追的，万一瞎了呢？
    c 宋卫平：足球还是要踢的，万一冲出亚洲了呢？
    d 茅威涛：越剧还是要看的，万一变成潮流了呢？
    e 马云：梦想还是要有的，万一实现了呢？
*/
$(function(){
    var App = window.App || {};
    // 图片预加载
    var imgLoad = function(imgs,done) {
        var imgs= imgs || [];
        var length = imgs.length, index = 0;
        var loadspan = document.getElementById('loadspan'),loadtxt = document.getElementById('id_load_num'); 
        
        if(length===0){
            page_load_done && page_load_done();
            done && done();
            return;
        }


        function load(){
            var img = new Image();
            img.src = imgs[index];
            if(img.complete){
                img=null;           
                setTimeout(function(){
                    onload();
                },10)
                return ;
            }
            img.onload=function(){
                img=null;   
                setTimeout(function(){
                    onload();
                },10)
            };
            img.onerror = function(){
                img=null;   
                setTimeout(function(){
                    onload();
                },10)
            };    
            function onload(){
                index++;
                var a = Math.floor(100 / length * index);       
                loadspan.style.width = a+'%';
                loadtxt.innerHTML = a+'%'             
                //修改进度
                if (index == length) {  
                    //进度改成100%
                    page_load_done && page_load_done(); 
                    done && done();            
                }else{
                    load();
                }       
            }
        }
        load();
    };
    function page_load_done(){
       
        $('#loadspan').css('width','100%');
        $('#id_load_num').text('100%');
        $('.page_load').addClass('ok');
        $('body').addClass('load');
        

    }
    window.fisrt = true;
    var audioPlayer = new iMobile.Player($('#audioBtn'));
    var handclapPlayer = $('#handclapPlayer')[0];

    var People = ['宗庆后','汤唯','宋卫平','茅威涛','马云'];
    var Map = {
        '宗庆后':'a',
        '汤唯':'b',
        '宋卫平':'d',
        '茅威涛':'e',
        '马云':'f'
    };
        var Talks = [
            '实业还是要做的，万一搞大了呢？',
            '女神还是要追的，万一瞎了呢？',
            '微博还是要刷的，万一火了呢？',
            '足球还是要踢的，万一冲出亚洲了呢？',
            '越剧还是要看的，万一变成潮流了呢？',
            '梦想还是要有的，万一实现了呢？'
        ];
        var winHeight = window.innerHeight;
        var winWidth = window.innerWidth;
        var move = winWidth/4;
        var _tximg = $('.door-man');
        var _t = 0;
        var _pcount = 1;
        // 人物并排坐的画布大小 2200*1088 手机屏幕 320*480  换算宽度 2200/winHeight = 1088/x
        var menWidth = 2200*winHeight/1088;
        var isdrag = false;
        var tx,x,ty,y;
        var imgUrl = App.imgUrl || './';
        var rangeArr = [];
        var microphoneWidth = 50;
        // 话筒可移动的最大距离
        var microphoneMax = (winWidth - microphoneWidth ) / 2;
        // 人物画布可移动的最大距离
        var menMax = menWidth - winWidth;
        // 两者的移动速率关系 V话筒/V画布 = microphoneMax / menMax

        init();
        //alert(navigator.userAgent+111111)
        function init(){

            var menLeft = 645*menWidth/2200;
            var w1 = 300*menWidth/2200;
            var w2 = 250*menWidth/2200;
            $('.men-container').css('width', Math.ceil(menWidth) + 10 + 'px');
            $('.people-list').css('left', menLeft + 'px');
            $('.people-list').css('width', Math.ceil(menWidth) + 10 - menLeft + 'px');
            //300,250,300,300,300
            $('.people-item').eq(0).css('width',w1);
            $('.people-item').eq(1).css('width',w2);
            $('.people-item').eq(2).css('width',w1);
            $('.people-item').eq(3).css('width',w1);
            $('.people-item').eq(4).css('width',w1);

            bindMove();
            bindUI();
            initRange();

            imgLoad([
                imgUrl + 'images/door-right.png',
                imgUrl + 'images/door-left.png',
                imgUrl + 'images/door.png',
                imgUrl + 'images/宗庆后.png',
                imgUrl + 'images/宋卫平.png',
                imgUrl + 'images/汤唯.png',
                imgUrl + 'images/茅威涛.png',
                imgUrl + 'images/马云.png',
                imgUrl + 'images/a.png',
                imgUrl + 'images/b.png',
                imgUrl + 'images/c.png',
                imgUrl + 'images/d.png',
                imgUrl + 'images/e.png',
                imgUrl + 'images/subway-bg.jpg',

                imgUrl + 'images/microphone.png'
                ],function(){

                
            });
            /*imgLoad([],function(){

            });*/
        }

        function run(){
       
            
            setTimeout(function(){

                openDoor(move,function(){
                    
                    
                    showMen();
                    /*_tximg.eq(0).animate({"opacity":1},"slow",function(){

                        //txload();
                    });*/
                });
            },1000);
        }
        function initRange(){
            var range = [];
            for(var i = 0;i<People.length;i++){
                range = getMeetDistance(i);
                rangeArr.push(range);
            }

            return rangeArr;
        }
        
        function bindUI(){
            
            $('#start').bind('click',function(){
            
                $('#start-container').remove();
                audioPlayer.play();
                handclapPlayer.play();
                handclapPlayer.pause();
                run();
            });
            
            $('#replay').bind('click',function(){
                initTouch();
                $('.subway-page-reuslt').removeClass('show');
            });

            $('#say2015').bind('click',function(){
                var name = window.man;
                
                MStorage.set('man',Map[name]);
                //alert('别急,开发中～')
                location.href = 'say.html';
            });

            // 话筒拖动提示
            $('.hande-container').bind('click',function(){
                $('.hande-container').hide();
            });

            $('.hande-container').bind('touchend',function(){
                $('.hande-container').hide();
            });

        }

        function openDoor(move,callback){
            $('#door-right').animate({left:move+'px'}, 500);
            $('#door-left').animate({right:move+'px'}, 500,function(){
                callback && callback();
                
            });
        }

        
        function showMen(){
            $('.men-container').animate({ left: - ( Math.ceil(menWidth) - winWidth )  + 'px' }, 2000,function(){
                setTimeout(function(){
                    $('.men-container').animate({left:'0'}, 2000,function(){
                        setTimeout(function(){
                            openDoor(winWidth/2,function(){
                                $('.subway-page-1,.subway-page-2').remove();
                                $('.people-item').removeClass('active');
                                $('.people-list').addClass('done');
                                initTouch();
                            });
                        },500);
                            
                    });
                },300);
            });
        }
        
        function bindMove (argument) {
            var events = 'ontouchend' in document ?['touchstart','touchmove','touchend']:['mousedown','mousemove','mouseup'];

            $('#moveid').bind(events[0],function(e){
                var originalEvent = e.originalEvent;
                console.log(e,originalEvent)
                touchStart(originalEvent);
                //console.log(e)
            });
            $('#moveid').bind(events[1],function(e){
                var originalEvent = e.originalEvent;

                touchMove(originalEvent);
                //console.log(e)
            });
            $('#moveid').bind(events[2],function(e){
                var originalEvent = e.originalEvent;

                touchEnd(originalEvent);
                //console.log(e)
            });
            //document.getElementById("moveid").addEventListener(events[0],touchStart);  
            //document.getElementById("moveid").addEventListener(events[1],touchMove);
            //document.getElementById("moveid").addEventListener(events[2],touchEnd); 
        }
        function initTouch(){
            tx = x = ty = y = 0;

            audioPlayer.play();
            $('.choose-box').show();
            window.fisrt && $('.hande-container').show();
            $("#moveid").css("left",0);
            $('.men-container').css('left',0 );
            window.fisrt = false;
        }
        function touchStart(e){ 
            var touches = e.touches || { 0:{ pageX:e.pageX,pageY:e.pageY } };
            isdrag = true; 
            e.preventDefault();
            
            tx = parseInt($("#moveid").css('left'));    
            ty = parseInt($("#moveid").css('top'));
            x = touches[0].pageX;
            y = touches[0].pageY;
            $('.hande-container').hide();
            //alert(x) 
          
        }   
        function getMeetDistance(index){
            var distance = 0;
            var contentW = menWidth;
            
            // V话筒 + V画布 = 两者之间的距离 可算出相遇点
            
            
            var sArr = [645,300,250,300,300,300];
            var start = 0,end = 0;

            // V_话筒 + V_话筒* (menMax/microphoneMax) = distance
            var calculateMeetPoint = function(distance){
                var result = 0;

                result = distance / (1+ (menMax/microphoneMax) );

                return result;
            };

            for(var i = 0;i<=index; i++){
                start = start + sArr[i];
            }
            end = start + sArr[index+1];
            // 换算成实际距离  s/2200*width
            start = start/2200*contentW;
            end = end/2200*contentW;

            console.log('start,end ',start,end);

            distance = start - (winWidth/2);
            var range0 = calculateMeetPoint(distance);

            distance = end - (winWidth/2);
            var range1 = calculateMeetPoint(distance);

            console.log('range ',range0,range1);
            

            return [range0,range1];


        }
        function touchMove(e){
            var touches = e.touches || { 0:{ pageX:e.pageX,pageY:e.pageY } };
            //console.log(touches[0],touches)
            if (isdrag) {
                
                e.preventDefault();
                var n = tx + touches[0].pageX - x;
                var t = touches[0].pageX - x;
                var d = Math.abs(n);
                var left = -n * ( menMax / microphoneMax ) ;

                if(n<0){
                    left = 0;
                }
                if(left<=(winWidth-menWidth)) {
                    left = winWidth-menWidth;
                }
                //var h = ty + e.touches[0].pageY - y;


               
                $("#moveid").css("left",n);
                $('.men-container').css('left',left + 'px' );


                if( n>rangeArr[0][0] && n<rangeArr[0][1] ) {
                    showActivePeople(0);

                }else if( n>rangeArr[1][0] && n<rangeArr[1][1] ){
                    showActivePeople(1);

                }else if( n>rangeArr[2][0] && n<rangeArr[2][1] ){
                    showActivePeople(2);

                }else if( n>rangeArr[3][0] && n<rangeArr[3][1] ){
                    showActivePeople(3);

                }else if( n>rangeArr[4][0] && n<rangeArr[4][1] ){
                    showActivePeople(4);

                }else {
                    showActivePeople(-1);
                }
      
            } 
            function showActivePeople(index){
                $('.people-item').removeClass('active');

                if(index>-1){
                    $('.people-item').eq(index).addClass('active');
                }
            }
        }
        function touchEnd(){
            isdrag = false;
            var n = parseInt( $("#moveid").css("left") );
            var r  = Math.abs(n);
            var isInRange = true;
            var name = '';

            if( n>rangeArr[0][0] && n<rangeArr[0][1] ) {
                console.log('choose:',0);
                name = People[0];
                $('#men-talk').html(Talks[0]);
                $('#men-avatar').attr('src', imgUrl + 'images/' + name + '.png');

            }else if( n>rangeArr[1][0] && n<rangeArr[1][1] ){
                console.log('choose:',1);
                name = People[1];
                $('#men-talk').html(Talks[1]);
                $('#men-avatar').attr('src', imgUrl + 'images/' + name + '.png');

            }else if( n>rangeArr[2][0] && n<rangeArr[2][1] ){
                console.log('choose:',2);
                name = People[2];
                $('#men-talk').html(Talks[2]);
                $('#men-avatar').attr('src', imgUrl + 'images/' + name + '.png');

            }else if( n>rangeArr[3][0] && n<rangeArr[3][1] ){
                console.log('choose:',3);
                name = People[3];
                $('#men-talk').html(Talks[3]);
                $('#men-avatar').attr('src', imgUrl + 'images/' + name + '.png');

            }else if( n>rangeArr[4][0] && n<rangeArr[4][1] ){
                console.log('choose:',4);
                name = People[4];
                $('#men-talk').html(Talks[4]);
                $('#men-avatar').attr('src', imgUrl + 'images/' + name + '.png');

            }else {
                $('#men-talk').html('');
                isInRange = false;
            }
            //return;
            //alert(name)
            if(isInRange) {
                $('.subway-page-reuslt').attr('data-role',name);
                window.man = name;
                audioPlayer.pause();

                setTimeout(function(){
                    handclapPlayer.play();
                },300);
                $('.choose-box').hide();
                $('.subway-page-reuslt').addClass('show');
            }else {
                window.name = null;
            }

        }

    
});