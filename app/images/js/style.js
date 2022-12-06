var page;
$(function () {
    //关闭
    $(document).on("click", "#alertInfo .close", dialog.closeDiv);

    page = new Swiper('#page', {
        direction: 'vertical',
        initialSlide: 1,
        autoplay: false,//可选选项，自动滑动
        // mousewheel: true,
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        noSwiping: true,
        noSwipingClass: 'stop-swiping',
        on: {
            // init: function (swiper) {
            //     let slide = this.slides.eq(0);
            //     slide.addClass('ani-slide');
            // },
            // resize: function () {
            //     this.update(); //窗口变化时，更新Swiper的一些属性，如宽高等
            // },
            // transitionStart: function () {
            //     for (i = 0; i < this.slides.length; i++) {
            //         let slide = this.slides.eq(i);
            //         slide.removeClass('ani-slide');
            //     }

            //     if (this.activeIndex == 0) {
            //         $('.main-menu li:nth-child(1)').addClass('curr').siblings().removeClass();
            //         aniYunJu()
            //     }
            //     if (this.activeIndex == 1) {
            //         $('.main-menu li:nth-child(2)').addClass('curr').siblings().removeClass();

            //         setTimeout(() => {
            //             // 云散
            //             aniYunSan()
            //         }, 500);

            //     }
            //     if (this.activeIndex == 2) {
            //         $('.main-menu li:nth-child(3)').addClass('curr').siblings().removeClass();
            //         aniYunJu()
            //     }


            // },
            // transitionEnd: function () {
            //     let slide = this.slides.eq(this.activeIndex);
            //     slide.addClass('ani-slide');
            // },
        },
    });

    // aniYunSan();
    // 缩放按钮
    $('.btn-scale .btn-sup').hover(function () {
        // over
        $('.btn-scale .after').stop().animate({ 'top': '0' }, 300);
        $('.btn-scale .btn-sup').css({ 'color': '#000' });
        $('.btn-scale .btn-sdown').css({ 'color': '#fff' });
    }, function () {
        // out
    });

    $('.btn-scale .btn-sdown').hover(function () {
        // over
        $('.btn-scale .after').stop().animate({ 'top': '0.5rem' }, 300);
        $('.btn-scale .btn-sup').css({ 'color': '#fff' });
        $('.btn-scale .btn-sdown').css({ 'color': '#000' });
    }, function () {
        // out
    });
});

// CUSTOM CURSOR -- 鼠标效果
document.addEventListener("DOMContentLoaded", function (event) {
    var cursor = document.querySelector(".custom-cursor");
    console.log(cursor);
    var links = document.querySelectorAll("a,.svg,.texts,.btn_pre_wrap,.link,.featdd dt,.swpfeat-bullet,.s3 .footer .ficon,.next,.wb_img,.up,.s2-stage-prizes dl dt,.s2-site");
    var initCursor = false;

    for (var i = 0; i < links.length; i++) {
        var selfLink = links[i];

        selfLink.addEventListener("mouseover", function () {
            cursor.classList.add("custom-cursor--link");
        });
        selfLink.addEventListener("mouseout", function () {
            cursor.classList.remove("custom-cursor--link");
        });
    }

    window.onmousemove = function (e) {
        var mouseX = e.clientX;
        var mouseY = e.clientY;

        if (!initCursor) {
            // cursor.style.opacity = 1;
            TweenLite.to(cursor, 0.3, {
                opacity: 1
            });
            initCursor = true;
        }

        TweenLite.to(cursor, 0, {
            top: mouseY + "px",
            left: mouseX + "px"
        });
    };

    window.onmouseout = function (e) {
        TweenLite.to(cursor, 0.3, {
            opacity: 0
        });
        initCursor = false;
    };
});


// 云散开
function aniYunSan() {
    TweenLite.fromTo('#myWindow', 2, {
        transform: "scale(0.5)",
    }, {
        transform: "scale(1)",
    });

    TweenLite.to('.yun1', 2, {
        opacity: 0.5,
        top: '-7rem',
        left: '-7rem',
    });

    TweenLite.to('.yun2', 2.1, {
        opacity: 0.5,
        top: '-5.5rem',
        right: '-7rem',
    });

    TweenLite.to('.yun3', 2.2, {
        opacity: 0.5,
        bottom: '-5.5rem',
        right: '-7rem',
    });

    TweenLite.to('.yun4', 2.3, {
        opacity: 0.5,
        bottom: '-5.5rem',
        left: '-7rem',
    });

    TweenLite.to('.s2-stageBox', 1, {
        opacity: 1,
        bottom: '0.8rem',
    });
};

// 云聚合
function aniYunJu() {
    TweenLite.fromTo('#myWindow', 1, {
        transform: "scale(1)",
    }, {
        transform: "scale(0.5)",
    });

    TweenLite.to('.yun1', 2, {
        opacity: 1,
        top: '0',
        left: '0',
    });

    TweenLite.to('.yun2', 2.1, {
        opacity: 1,
        top: '0',
        right: '0',
    });

    TweenLite.to('.yun3', 2.2, {
        opacity: 1,
        bottom: '0',
        right: '0',
    });

    TweenLite.to('.yun4', 2.3, {
        opacity: 1,
        bottom: '0',
        left: '0',
    });

    TweenLite.to('.s2-stageBox', 1, {
        opacity: 0,
        bottom: '-1.8rem',
    });
};


// 获取角度
function getAngle(angx, angy) {
    return (Math.atan2(angy, angx) * 180) / Math.PI;
}

// 手势 1上 2下 3左 4右 0点击
function getDirection(startx, starty, endx, endy) {
    const angx = endx - startx;
    const angy = endy - starty;
    let result = 0;
    // 滑动距离太短
    if (Math.abs(angx) < 20 && Math.abs(angy) < 100) {
        return result;
    }

    const angle = getAngle(angx, angy);
    if (angle >= -135 && angle <= -45) {
        result = 1;
    } else if (angle > 45 && angle < 135) {
        result = 2;
    } else if (
        (angle >= 120 && angle <= 180) ||
        (angle >= -180 && angle < -120)
    ) {
        result = 3;
    } else if (angle >= -60 && angle <= 60) {
        result = 4;
    }
    return result;
}

// GA 
function Google_gtag(oEle, params) {
    let $oEle = $(oEle);
    $(document).on('click', oEle, function (event) {
        console.log($oEle);
        gtag('event', params, {
            'method': 'Google',
            'event_category': params,
            'event_action': params,
            'event_label': params
        });
    });
};
