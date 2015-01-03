
$(function(){
    var App = window.App || {};
    
    // 滑动参数
    var swipeConfig = {
        coverUrl:'',
        swipeCur: 0,
        swipeDir:'vertical', // 'vertical' // horizontal
    };

    // 图片预加载
    var imgLoad = function(imgs,done) {
        var imgs= imgs || [];
        var length = imgs.length, index = 0;
        var loadspan = document.getElementById('loadspan'),
            loadtxt = document.getElementById('id_load_num'); 
        
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

        function page_load_done(){
            $('#loadspan').css('width','100%');
            $('#id_load_num').text('100%');
            $('.page_load').addClass('ok');
            $('body').addClass('done'); 
        }
    };
        
    // 每页绑定滑动
    var pageSwiper = window.pageSwiper = new Swiper('.swipe',{
        slideActiveClass:'cur',
        onSlideChangeEnd:function(swiper){
            
        },
        onTouchMove:function(swiper){
        },
        mode:'vertical',
        //pagination: '.pagination',
        loop:true,
        grabCursor: false
        //paginationClickable: true
    });

    var swiper2 = new Swiper('.swiper-container-2',{
        //slideActiveClass:'cur',
        onSlideChangeEnd:function(swiper){
            
        },
        onTouchMove:function(swiper){
        },
        mode:'horizontal',
        //pagination: '.pagination',
        loop:false,
        grabCursor: true
        //paginationClickable: true
    });


    $(document).on('click','[data-role="page-6-dialog"]',function(){
        $('.page-6-dialog').remove();
        $('body').append('<div class="page-6-dialog"></div>');
        $('.page-6-dialog').bind('click',function(){
            $(this).remove();
        });
    });
        
    function init(){
        var dir = App.dir;
        var imgs = [
            dir + 'assets/images/1.jpg',
            dir + 'assets/images/1-1.png',
            dir + 'assets/images/1-2.png',
            dir + 'assets/images/2.jpg',
            dir + 'assets/images/2-1.png',
            dir + 'assets/images/2-2.png',
            dir + 'assets/images/2-3.png',
            dir + 'assets/images/3.jpg',
            dir + 'assets/images/3-2-1.png',
            dir + 'assets/images/3-2-2.png',
            dir + 'assets/images/3-2-3.png',
            dir + 'assets/images/3-2-4.png',
            dir + 'assets/images/3-3.png',
            dir + 'assets/images/4.jpg',
            dir + 'assets/images/4-1.png',
            dir + 'assets/images/4-circle1.png',
            dir + 'assets/images/4-circle2.png',
            dir + 'assets/images/4-circle3.png',
            dir + 'assets/images/4-circle4.png',
            dir + 'assets/images/5.jpg',
            dir + 'assets/images/5-1.png',
            dir + 'assets/images/5-2.png',
            dir + 'assets/images/5-3.png',
            dir + 'assets/images/6.jpg',
            dir + 'assets/images/6-1.png',
            dir + 'assets/images/6-2.png',
            dir + 'assets/images/6-3.png',
            dir + 'assets/images/6-4.png',
            dir + 'assets/images/6-dialog.jpg'
        ];
        var audioPlayer = new iMobile.Player($('#audioBtn'));

        $(document).one('touchstart',function(){
            audioPlayer.play();
        });
        imgLoad(imgs);
        //audioPlayer.play();
        //document.getElementById('player').play();

    }


    init();


   
});
    