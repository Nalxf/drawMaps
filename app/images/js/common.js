/*wlo:Cflower*/


var ModalHelper = (function (bodyCls) {

    console.log(bodyCls);
    var scrollTop, doc, reg;
    var bodyClassName = "";
    var bodyEle = document.body;
    return {
        afterOpen: function () {
            doc = document.documentElement.scrollTop ? document.documentElement : bodyEle;
            scrollTop = doc.scrollTop;

            if (bodyEle.classList) {
                bodyEle.classList.add(bodyCls)
            } else {
                bodyEle.className += " " + bodyCls;
            }

            bodyEle.style.top = -scrollTop + 'px';
            bodyClassName = bodyEle.className;
        },

        beforeClose: function () {
            if (bodyEle.classList) {
                bodyEle.classList.remove(bodyCls)
            } else {
                reg = new RegExp("\\b" + bodyCls + "\\b", "g", "gi");
                if (reg.test(bodyClassName)) {
                    bodyClassName = bodyClassName.replace(reg, "");
                    bodyEle.className = bodyClassName;
                }
            }

            bodyEle.style.top = "";
            doc.scrollTop = scrollTop;
        }
    };
})('dialog-open');

var dialog;
if (!dialog) dialog = {};
var flagPC = true;
dialog = {
    //关闭  document.location.reload()
    closeDiv: function () {
        // $("body").css("position", "relative");
        $("#alertInfo").stop(true, true).animate({
            "top": "-100%",
            "opacity": "0"
        }, "fast", function () {
            $("#maskLayer,#alertInfo").remove().hide();
        });

        // 关闭时调用
        // ModalHelper.beforeClose();
    },
    //
    maskLayer: function () {
        $("#maskLayer,#alertInfo").remove();
        var maskLayer = "<div id='maskLayer'></div>";
        var alertInfo = "<div id='alertInfo'><span class='close'>关闭</span></div>";
        $("body").append(maskLayer, alertInfo);
        $('.wrap').addClass('row');
        $("#maskLayer").height('100%').show();
    },
    //显示提示信息框
    showInfo: function (alertHtml) {
        dialog.maskLayer();
        // $("body").css({'position':'fixed','width':'100%'});
        var _winH = $(window).height(); //﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣┐
        var _scrollTop = $(document).scrollTop(); //　　　　　　　　　　　      ├→
        $("#alertInfo").append(alertHtml).show(); //﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣┘
        var _thisDomWidth = $("#alertInfo").outerWidth();
        var _thisDomHeight = $("#alertInfo").outerHeight();
        var topD = parseInt(_scrollTop + (_winH - _thisDomHeight) / 2);
        var mL = parseInt(_thisDomWidth / 2);
        if (_thisDomHeight >= _winH) {
            topD = _scrollTop;
            if (_scrollTop + _thisDomHeight >= $(document).height()) {
                topD = $(document).height() - _thisDomHeight;
            };
            $("#alertInfo").css("position", "absolute");
        } else {
            topD = (_winH - _thisDomHeight) / 2;
            $("#alertInfo").css("position", "fixed");
        };
        $("#alertInfo").css({
            "margin-left": "-" + mL + "px"
        }).stop(true, true).animate({
            "top": topD + "px",
            "margin-left": "-" + mL + "px",
            "opacity": "1"
        }, "fast");

        // 打开时调用
        // ModalHelper.afterOpen();
    },
    //改变窗口大小时改变弹出层的位置
    alertInfoPo: function () {
        var _winHResize = $(window).height();
        var _scrollTopResize = $(document).scrollTop();
        var _thisDomWidthResize = $("#alertInfo").outerWidth();
        var _thisDomHeightResize = $("#alertInfo").outerHeight();
        var topResize = parseInt(_scrollTopResize + (_winHResize - _thisDomHeightResize) / 2);
        if (topResize >= $("body").height() - _thisDomHeightResize) {
            _scrollTopResize = $("body").height() - _thisDomHeightResize;
            topResize = _scrollTopResize - (_winHResize - _thisDomHeightResize) / 2;
        };
        if (_thisDomHeightResize >= _winHResize) {
            topResize = _scrollTopResize;
            if (_scrollTopResize + _thisDomHeightResize >= $(document).height()) {
                topResize = $(document).height() - _thisDomHeightResize;
            };
            $("#alertInfo").css("position", "absolute");
        } else {
            topResize = (_winHResize - _thisDomHeightResize) / 2;
            $("#alertInfo").css("position", "fixed");
        };
        $("html,body").stop(true, true).animate({
            scrollTop: _scrollTopResize
        });
        $("#alertInfo").stop(true, true).animate({
            "top": topResize + "px",
            "margin-left": "-" + (_thisDomWidthResize / 2) + "px"
        })
        $("#maskLayer").height($("body").height());
    },
    //视频弹窗
    alertVideo: function (videoUrl) {
        let sendUrl = videoUrl;

        dialog.showInfo(
            "<div class='pop_warp  popytbVideo'>"
            + "<div class='before '>"
            // +"<embed src='"+videoUrl+"' type='application/x-shockwave-flash' allowscriptaccess='always' allowfullscreen='true' wmode='opaque'>"
            // + "<iframe border='0' marginwidth='0' framespacing='0' marginheight='0' src='" + sendUrl + "' frameborder='0' noresize='scrolling='no' width='100%' height='100%' vspale='0' id='iframe' name='iframe' allowfullscreen></iframe>" +
            + '<video src="' + sendUrl + '" muted loop autoplay="autoplay" playsinline="" webkit-playsinline="" x5-playsinline="" controls="controls"></video>' +
            "</div>" +
            "</div>")

    },
    // 活动规则
    alertPop_gz: function () {
        dialog.showInfo(`<div class="pop-lobal pop-lobal-big">
            <div class="borbox pop_center">
                <h2>ルール説明</h2>
                <div class="gzbox">
                    <p>
                        【参加方法】*橙色字部分突出展示<br/>1. 本事前登録ページにTwitterアカウントを登録後、各任務を達成して獲得できる矢を使用して投壺に挑戦できます。<br/>2. 投壶は1回ごとに矢を1本消費します。抽選回数と任務の達成状況は、毎日午前5時にリセットされます。<br/>3. 投壶を1回行うと報酬がランダムで1つ獲得できます。入手した報酬は「獲得済み報酬」に収められます。<br/>4. 投壶で獲得できる賞品はゲーム内アイテムと実物賞品の2種類です。実物賞品は本キャンペーンの抽選賞品となります。<br/>5. 獲得済み報酬は最大5つまで所持できます。それ以上の賞品を獲得した場合は、手持ちの任意の賞品と入れ替えることができます。入れ替えを行わない場合、新しく獲得した賞品は無効となります。<br/>6. 投壶で獲得した各ゲーム内アイテムには、本キャンペーン終了後にギフトコードが発行されます。ゲームリリース後、ゲーム内の「設置」→「一般」→「ギフトコード」に入力することでアイテムを獲得できます。<br/>7. 実物賞品が当選された場合、「獲得済み報酬」→「賞品」をクリックして、お客様のメールアドレスを記入いただきます。後日、弊社運営から賞品発送に関するご連絡をいたします。<br/><br/>【任務内容（矢の獲得方法）】<br/>1. 本事前登録ページにTwitterアカウントを登録すると、毎日矢を一本獲得できます。登録によって獲得した矢は累積できません。<br/>2. 一日一回、本事前登録ページをTwitterにシェアすると矢を一本獲得できます。<br/>3. 一日一回、本事前登録ページをLINEにシェアすると矢を一本獲得できます。<br/>4.「三国極戦」公式Twitterをフォローすると、矢を一本獲得できます。<br/>5.「三国極戦」公式YouTubeをフォローすると、矢を一本獲得できます。<br/>6.「三国極戦」公式Discordをフォローすると、矢を一本獲得できます。<br/><br/>【キャンペーン期間】<br/>2022年10月8日~2022年11月23日<br/><br/>【ギフトコードの入力可能期間】<br/>本サービス正式リリース後〜2022年12月31日23:59<br/><br/>【注意事項】<br/>1. 本キャンペーンにご応募いただく際には、本注意事項が適用されることにご同意いただける場合に限り、ご応募ください。<br/>2. 本キャンペーンへのご応募には、Twitterへの登録が必要になります。<br/>3. 同一人物による複数のTwitterアカウントの応募が確認された場合、ご応募・ご当選を無効とさせていただきます。<br/>4. ギフトコード入力可能期間中、ギフトコードの使用は1キャラクターにつき5回までとなります。<br/>5. 実物賞品の発送に関しまして、お客様のメールアドレスをいただき次第、運営より発送に関するご連絡を差し上げます。指定の期限までにメールアドレスをいただけない 又は メールアドレスの入力に誤りがあった場合、当選を無効又は辞退したものとさせていただきます。予めご了承ください。<br/>6. 実物賞品は正式サービス開始後、一ヶ月内に発送予定ですが、出荷状況により発送予定日が遅くなる場合もあります。予めご了承ください。<br/>7. 実物賞品の当選権利は当選したご本人様のみに限り有効です。家族や友人等の第三者への譲渡、転売、換金はできません。<br/>8. 実物賞品のお受け取りは日本国内に限ります。日本国外への発送はできませんので予めご了承ください。<br/>9. 賞品は弊社提携先の物流業者より発送致します。<br/>10. いただいた個人情報は、賞品の発送とご連絡以外の用途には一切使用いたしません。<br/>11. 賞品内容は、予告なく内容・仕様・数量が変更になる場合がございます。予めご了承ください。<br/>12. 賞品は返品や、その他の賞品とは交換できません。<br/>13. 本キャンペーンへの参加に際し、参加者と第三者との間に紛争が生じた場合、当該参加者は自らの責任と費用負担によりそれを解決し、弊社に一切責任が生じないものとします。<br/>14. 本事項に反する行為・不正な行為があると判断した場合は、ご応募・ご当選を無効とさせていただきます。<br/>15. Apple、Apple ロゴ、iPhoneは、米国および他の国々で登録された Apple Inc. の商標です。<br/>
                    </p>
                </div>
            </div>
        </div>`);

        $(".pop_center .gzbox").mCustomScrollbar();
    },
    // 输入邮箱弹框 预约
    alertPop_preEmail: function () {
        dialog.showInfo(`<div class="pop-lobal pop-lobal-email">
            <div class="msgbox">
                <div class="os-type">
                    <p class="os-ios" data-os="ios"></p>
                    <p class="os-and" data-os="android"></p>
                </div>
                <div class="embox">
                    <input class="Email" type="email" placeholder="Enter your email address">
                    <p class="tips"></p>
                </div>

                <div class="emRadio">
                    <p>I agree to receive emails and accept the Privacy  Policy as well as the Terms of Service.</p>
                </div>

                <div class="xieyi">
                    <a href="javascript:;" class="btn btn-pp">Privacy Policy</a>
                    <a href="javascript:;" class="btn btn-tos">Terms of  Service</a>
                </div>
                <span class="btn btn_email_up"></span>
            </div>
        </div>`);
    },
    // 邮箱预约 完成
    alertPop_preEndEmail: function (msg) {
        dialog.showInfo(`<div class="pop-lobal pop-lobal-preEnd">
                <div class="msgbox">
                    <div class="confirm_btn">
                        <span class="btn btn_confirm_ytb"></span>
                        <span class="btn btn_confirm_fb"></span>
                        <span class="btn btn_confirm_dc"></span>
                    </div>
                </div>
        </div>`);

        $('.pop-lobal-preEnd').siblings('.close').css({right:'0.8rem'})
    },
    // 邮箱预约 重复
    alertPop_preRepEmail: function (msg) {
        dialog.showInfo(`<div class="pop-lobal pop-lobal-preRep">
                <div class="msgbox">
                    <div class="confirm_btn">
                        <span class="btn btn_confirm_ytb"></span>
                        <span class="btn btn_confirm_fb"></span>
                        <span class="btn btn_confirm_dc"></span>
                    </div>
                </div>
        </div>`);
        $('.pop-lobal-preRep').siblings('.close').css({right:'0.8rem'})
    },
};

