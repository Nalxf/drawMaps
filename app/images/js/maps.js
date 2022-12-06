/**
 * @description 滚轮缩放元素
 * @param targetEl 被缩放目标元素
 * @param wrapperEl 产生缩放的包裹元素，默认是targetEl的父元素
 */

var scale = 0.8; // 初始缩放比率
var scalePercent = 0.2; // 缩放系数（越大缩放跨度越大）
var minScale = 0.8; // 最小缩放比率
var maxScale = 2; // 最大缩放比率
function addScale(targetEl, wrapperEl) {
    // var transformOrigin = "left top"; // 以左上角为基准点，不会造成元素超出左、上边界而没有滚动条问题
    var transformOrigin = "center center"; // 以左上角为基准点，不会造成元素超出左、上边界而没有滚动条问题

    wrapperEl = wrapperEl || targetEl.parentElement; // 默认取父元素
    wrapperEl.addEventListener("mousewheel", onMouseWheel);

    // 鼠标滚轮事件
    function onMouseWheel(e) {
        // var e = e || window.e;
        var down = true; // 定义向下滚动的标志
        down = e.wheelDelta ? e.wheelDelta < 0 : e.detail > 0;
        // 鼠标滚轮向下缩小
        if (down) {
            scale = (parseFloat(scale) - scalePercent).toFixed(2);
            if (scale > minScale) {
                // targetEl.style.transform = "scale(" + scale + ")";
                targetEl.style.transformOrigin = transformOrigin;

                TweenLite.to(targetEl, 0.2, {
                    "transform": "scale(" + scale + ")",
                });
                if (scale < 1.5) {

                    TweenLite.to('.maps-line span', 0.5, {
                        "opacity": '0'
                    });
                }

            } else {
                scale = minScale;
            }
        } else {
            // 鼠标滚轮向上放大
            scale = (parseFloat(scale) + scalePercent).toFixed(2);

            if (scale < maxScale) {
                TweenLite.to(targetEl, 0.2, {
                    "transform": "scale(" + scale + ")",
                });
                // targetEl.style.transform = "scale(" + scale + ")";
                targetEl.style.transformOrigin = transformOrigin;

                if (scale > 1.5) {

                    TweenLite.to('.maps-line span', 0.5, {
                        "opacity": '1'
                    });
                }
            } else {
                scale = maxScale;
            }
        }
        if (e.preventDefault) {
            /*FF 和 Chrome*/
            e.preventDefault(); // 阻止默认事件
        }
        return false;
    }
}


// 缩放
addEventListener("onload", addScale(document.getElementById("myWindow")));




// 点击放大
$(document).on('click', '.btn-sup', function (event) {
    event.preventDefault();
    console.log(scale);

    scale += 0.6;

    if (scale <= maxScale) {
        TweenLite.to('#myWindow', 0.2, {
            "transform": "scale(" + scale + ")",
        });
        // targetEl.style.transform = "scale(" + scale + ")";

        if (scale > 1.5) {
            TweenLite.to('.maps-line span', 0.5, {
                "opacity": '1'
            });
        }
    } else {
        scale = maxScale;
    }
});

$(document).on('click', '.btn-sdown', function (event) {
    event.preventDefault();
    console.log(scale);

    scale -= 0.5;

    if (scale >= minScale) {

        TweenLite.to('#myWindow', 0.2, {
            "transform": "scale(" + scale + ")",
        });


        if (scale > 1.5) {
            TweenLite.to('.maps-line span', 0.5, {
                "opacity": '0'
            });
        }

    } else {
        scale = minScale;
    }
});


// 限制范围的拖拽
const wrapper = document.getElementById("mapWrap");

const mapsWidht = $('.maps').width();
const mapsHeight = $('.maps').height();

const innerWidht = $(window).width();
const innerHeight = $(window).height();

const posLeft = (mapsWidht - innerWidht) / 2
const posTop = (mapsHeight - innerHeight) / 2

const bs = new BScroll(wrapper, {
    startX: -posLeft,
    startY: -posTop,
    bounce: false,
    scrollX: true,
    scrollY: true,
    freeScroll: true,
    outOfBoundaryDampingFactor: 1 / 4,
})


// let ICON_LINK = "//cdnstatic.herogame.com/static/dragonhunt_herogame_com/pre/m/";
let ICON_LINK = "";

let fengImgArr = [];
let huoImgArr = [];
let tuImgArr = [];
let bingImgArr = [];
let shuiImgArr = [];




// for (let i = 0; i < 61; i++) {
//     if (i < 10) {
//         fengImgArr.push(`${ICON_LINK}/images/maps/风/页面效果_0000${i}.png`);
//     } else {
//         fengImgArr.push(`${ICON_LINK}/images/maps/风/页面效果_000${i}.png`);
//     }
// }

for (let i = 0; i < 61; i++) {
    if (i < 10) {
        fengImgArr.push(`${ICON_LINK}/images/maps/风2/feng_0000${i}.png`);
    } else {
        fengImgArr.push(`${ICON_LINK}/images/maps/风2/feng_000${i}.png`);
    }
}

for (let i = 0; i < 61; i++) {
    if (i < 10) {
        huoImgArr.push(`${ICON_LINK}/images/maps/火/火_0000${i}.png`);
    } else {
        huoImgArr.push(`${ICON_LINK}/images/maps/火/火_000${i}.png`);
    }
}

for (let i = 0; i < 61; i++) {
    if (i < 10) {
        tuImgArr.push(`${ICON_LINK}/images/maps/沙/页面效果_0000${i}.png`);
    } else {
        tuImgArr.push(`${ICON_LINK}/images/maps/沙/页面效果_000${i}.png`);
    }
}
for (let i = 0; i < 61; i++) {
    if (i < 10) {
        bingImgArr.push(`${ICON_LINK}/images/maps/冰/冰_0000${i}.png`);
    } else {
        bingImgArr.push(`${ICON_LINK}/images/maps/冰/冰_000${i}.png`);
    }
}

for (let i = 0; i < 61; i++) {
    if (i < 10) {
        shuiImgArr.push(`${ICON_LINK}/images/maps/雨/雨_0000${i}.png`);
    } else {
        shuiImgArr.push(`${ICON_LINK}/images/maps/雨/雨_000${i}.png`);
    }
}



var framePlayerFeng = new vFramePlayer({
    dom: document.getElementById("feng_box"),
    imgArr: fengImgArr,
    fps: 25,
    useCanvas: true,
    loop: -1,
});

var framePlayerHuo = new vFramePlayer({
    dom: document.getElementById("huo_box"),
    imgArr: huoImgArr,
    fps: 25,
    useCanvas: true,
    loop: -1,
});

var framePlayerTu = new vFramePlayer({
    dom: document.getElementById("tu_box"),
    imgArr: tuImgArr,
    fps: 25,
    useCanvas: true,
    loop: -1,
});

var framePlayerBing = new vFramePlayer({
    dom: document.getElementById("bing_box"),
    imgArr: bingImgArr,
    fps: 25,
    useCanvas: true,
    loop: -1,
});


var framePlayerShui = new vFramePlayer({
    dom: document.getElementById("sui_box"),
    imgArr: shuiImgArr,
    fps: 18,
    useCanvas: true,
    loop: -1,
});


// framePlayerFeng.play()
// framePlayerHuo.play()
// framePlayerTu.play()
// framePlayerBing.play()
// framePlayerShui.play()


$('.s2-site1').hover(function () {
    TweenLite.to('#feng_box', 0.2, {
        "opacity": "1",
    });
    framePlayerFeng.play(0);
}, function () {
    TweenLite.to('#feng_box', 0.2, {
        "opacity": "0",
    });
    framePlayerFeng.stop();
})


$('.s2-site2').hover(function () {
    TweenLite.to('#huo_box', 0.2, {
        "opacity": "1",
    });
    framePlayerHuo.play(0);
}, function () {
    TweenLite.to('#huo_box', 0.2, {
        "opacity": "0",
    });
    framePlayerHuo.stop();
})

$('.s2-site3').hover(function () {
    TweenLite.to('#tu_box', 0.2, {
        "opacity": "1",
    });
    framePlayerTu.play(0);
}, function () {
    TweenLite.to('#tu_box', 0.2, {
        "opacity": "0",
    });
    framePlayerTu.stop();
    framePlayerTu.goto(0);
})

$('.s2-site4').hover(function () {
    TweenLite.to('#bing_box', 0.2, {
        "opacity": "1",
    });
    framePlayerBing.play(0);
}, function () {
    TweenLite.to('#bing_box', 0.2, {
        "opacity": "0",
    });
    framePlayerBing.stop();
})

$('.s2-site5').hover(function () {
    TweenLite.to('#sui_box', 0.2, {
        "opacity": "1",
    });
    framePlayerShui.play(0);
}, function () {
    TweenLite.to('#sui_box', 0.2, {
        "opacity": "0",
    });
    framePlayerShui.stop();
})


