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

});
