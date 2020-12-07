$('document').ready(function() {
    $('.counter').each(index => {
        const counterElement = $('.counter')[index];
        const label = $(counterElement).attr('label');
        const icon = $(counterElement).attr('icon');
        $(counterElement).html('\
            <div class="counter-icon"><i class="' + icon + '"></i></div>\
            <div class="counter-num"></div>\
            <div class="counter-label">' + label + '</div>'
        );
    });
});

$('body').on('scroll', function(){
    $('.counter').each(index => {
        const counterElement = $('.counter')[index];
        if (ifDoCount($(counterElement))) {
            const from = $(counterElement).attr('from') ? parseInt($(counterElement).attr('from'), 10) : 0;
            const to = $(counterElement).attr('to') ? parseInt($(counterElement).attr('to'), 10) : 0;
            let num = from;
            const interval = setInterval(function(){
                $(counterElement).find('.counter-num').text(num);
                if (num < to) num ++;
                else clearInterval(interval);
            }, 100);
        }
    });
});

const ifDoCount = (element) => {
    const isOnScreenPrev = element.attr('isOnScreen') === 'true';
    const win = $(window);
    const viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
    
    const bounds = element.offset();
    bounds.right = bounds.left + element.outerWidth();
    bounds.bottom = bounds.top + element.outerHeight();
    
    const isOnScreen = !(viewport.right < bounds.left ||
        viewport.left > bounds.right ||
        viewport.bottom < bounds.top ||
        viewport.top > bounds.bottom);
    let retVal = false;
    if (!isOnScreenPrev && isOnScreen) retVal = true;
    element.attr('isOnScreen', isOnScreen);
    return retVal;
};