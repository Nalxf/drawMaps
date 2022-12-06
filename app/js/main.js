/*
 * @Author: lixuefeng
 * @Date:   2019-07-15 11:27:25
 * @Last Modified by:   A
 * @Last Modified time: 2022-02-26 15:36:14
 * @File_path:  E:\0_job_progect\20200101_huaer\gulpfile_xiaochu\app\js\webmain$Axios.js
 */
/*========================Axios====================*/
//当创建实例的时候配置默认配置
var instance = axios.create({
    method: 'post',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    //transformRequest是你在data传输前进行数据处理，如果不处理你的数据会显示object.object
    transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        let ret = '';
        for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
        };
        return ret;
    }]
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    var index = layer.load(2, {
        shade: [0.1, '#fff'] //0.1透明度的白色背景
    });
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    layer.closeAll();
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
/* ======================= $axios end ======================= **/



var HeroApp = {
    // 重复点击开关
    bOff: true, // 自定义开关 布尔值
    drawBoff: false, // 抽奖开关
    bEmail: null, // 是否是一个邮箱 布尔值
    upData: null, // url中返回的携带的参数
    aUrlData: [], // 存储url中返回的参数数组
    user_from_uid: '', // 分享参数
    upImgApi: '',
    heroLb: null,
    heroLb2: null,
    heroLb3: null,
    heroLb4: null,
    // 校验邮箱
    isEmail: function (strEmail) {
        if (strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) {
            return true;
        } else {
            return false;
        }
    },
    // 复制粘贴功能
    tapCopy: function ($id) {
        HeroApp.selectText($id);
        document.execCommand('copy');
    },
    //选中文本
    selectText: function (element) {
        var text = document.getElementById(element);
        //做下兼容
        if (document.body.createTextRange) { //如果支持
            var range = document.body.createTextRange(); //获取range
            range.moveToElementText(text); //光标移上去
            range.select(); //选择
        } else if (window.getSelection) {
            var selection = window.getSelection(); //获取selection
            var range = document.createRange(); //创建range
            range.selectNodeContents(text); //选择节点内容
            selection.removeAllRanges(); //移除所有range
            selection.addRange(range); //添加range
            /*if(selection.setBaseAndExtent){
             selection.setBaseAndExtent(text, 0, text, 1);
             }*/
        } else {
            layer.msg('请稍后再试');
        }
    },
    // 获取预约人数
    getBindPerson: async function () {
        var res = await instance.post('/common/get-yuyue-count.html', {
            name: "preCount"
        });

        console.log(res.data);
        if (res.data.status == 0) {
            // res.data.data.num  = '432657';
            // 动态创建预约人数
            HeroApp.createPersonNum(("000000" + res.data.msg).substr(-6));


            if (res.data.msg >= '10000') {
                $('.s2-stage-prizes dl:nth-child(1)').addClass('curr');
                $('.s2-progressBar').addClass('stage1');
            }

            if (res.data.msg >= '30000') {
                $('.s2-stage-prizes dl:nth-child(2)').addClass('curr');
                $('.s2-progressBar').addClass('stage2');
                $('.maps-line .mpline1').css('filter','grayscale(0%)')
            }

            if (res.data.msg >= '50000') {
                $('.s2-stage-prizes dl:nth-child(3)').addClass('curr');
                $('.s2-progressBar').addClass('stage3');
                $('.maps-line .mpline2').css('filter','grayscale(0%)')
            }

            if (res.data.msg >= '70000') {
                $('.s2-stage-prizes dl:nth-child(4)').addClass('curr')
                $('.s2-progressBar').addClass('stage4');
                $('.maps-line .mpline3').css('filter','grayscale(0%)')
            }

            if (res.data.msg >= '100000') {
                $('.s2-stage-prizes dl:nth-child(5)').addClass('curr')
                $('.s2-progressBar').addClass('stage5');
                $('.maps-line .mpline4').css('filter','grayscale(0%)')
            }
        } else {
            HeroApp.createPersonNum('999999');
        }
    },
    // 创建动画预约人数
    createPersonNum: function (num) {
        var debugging = num; //自定义数字备用
        var digit;
        var digitHtml = digit = `<div class="digit">
                        <ul>
                            <li>0</li>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>4</li>
                            <li>5</li>
                            <li>6</li>
                            <li>7</li>
                            <li>8</li>
                            <li>9</li>
                            <li>0</li>
                        </ul>
                    </div>`;
        // console.log(debugging.length)
        for (let j = 0; j < debugging.length - 1; j++) {
            digit += digitHtml;
        }
        $('.panel').html(digit);

        for (let j = 0; j < debugging.length; j++) {
            $(".panel .digit").eq(j).attr({ 'data-aos': 'flip-left', 'data-aos-anchor-placement': 'center-bottom', 'data-aos-duration': j * 200 + 600 });
        }

        setInterval(() => {
            var stamp = debugging ? debugging : Date.parse(new Date()) / 1000 | 0;
            stamp = stamp.toString();
            if (stamp.length < debugging.length) {
                stamp = "0".repeat(debugging.length - stamp.length) + stamp;
            }
            for (let i = 0; i < debugging.length; i++) {
                $(".panel .digit:nth-child(" + (i + 1) + ") ul").css('margin-top', "-" + (Number(stamp.charAt(i)) * 100 / 100) + "rem");
            }
        }, 10);
    },
    // 新闻选项卡
    argumentsTabs: function (tabList, page) {
        var $div_li = $(tabList);
        $div_li.click(function () {
            $(this).addClass('curr').siblings().removeClass('curr');
            var index = $div_li.index(this);

            $(page).eq(index).addClass('curr').siblings('.show').removeClass('curr');
            // page.slideTo(index, 800, false);//切换到第一个slide，速度为1秒
            // 跟随横条
            // console.log(index);
            // $(this).siblings('.swp-nav .after').stop().animate({ 'left': (index * 2.65) + 0.6 + 'rem' }, "88");
        }).eq(0).click();
    },
    // 导航
    navTabs: function (tabList, page) {
        var $div_li = $(tabList);
        $div_li.click(function () {
            $(this).addClass('curr').siblings().removeClass('curr');
            var index = $div_li.index(this);

            console.log(index);
            if (index == 0) {
                $("html,body").animate({ "scrollTop": 0 }, 300);  //滚动到指定位置
            }

            if (index == 1) {
                let h = $('.game_pot').offset().top;
                $("html,body").animate({ "scrollTop": h - 20 }, 300);  //滚动到指定位置
            }

            if (index == 2) {
                let h = $('.preLott').offset().top;
                $("html,body").animate({ "scrollTop": h - 20 }, 300);  //滚动到指定位置
            }

            if (index == 3) {
                let h = $('.hero-box').offset().top;
                $("html,body").animate({ "scrollTop": h - 100 }, 300);  //滚动到指定位置
            }

            if (index == 4) {
                let h = $('.page4').offset().top;
                $("html,body").animate({ "scrollTop": h }, 300);  //滚动到指定位置
            }

            if (index == 5) {
                // let h = $('.media').offset().top;
                // $("html,body").animate({ "scrollTop": h }, 300);  //滚动到指定位置
            }


            $('.botBar-menuBtn').removeClass('on');
            $('.nav').stop().animate({
                'top': '-100%'
            }, 450)

        });
    },
    /* 
  * 8为东八区北京时间 东区时区1~12 西区时区-1~-12
  *  东1~12 东京时间  +9
  *  西1~12 阿拉斯加时间 -9
  * */
    getCurrentTime: function (t) {
        //t为时区参数  默认东八区北京时间
        if (!t) t = 8;
        const time = new Date();
        const len = time.getTime();
        const offset = time.getTimezoneOffset() * 60000; //本地时间与GMT时间差值
        const utcTime = len + offset;  //格林尼治时间

        const date = new Date(utcTime + 3600000 * t); //格林尼治时间和当前时区差值
        const y = date.getFullYear(),
            mon = date.getMonth() + 1,
            d = date.getDate(),
            h = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds();

        //不足两位补0
        function addZero(value) {
            if (value < 10) return "0" + value;
            else return value;
        }
        // const result = y + "-" + addZero(mon) + "-" + addZero(d) + " " + addZero(h) + ":" + addZero(m) + ":" + addZero(s);
        const result = y + "" + addZero(mon) + "" + addZero(d) + "" + addZero(h) + "" + addZero(m) + "" + addZero(s);
        return result
    },
    // 模拟登录
    testLogin: async function () {
        var res = await instance.get('/pre/test-login');
        // console.log(res.data);
    },
    // 获取用户信息
    getUserInfo: async function () {
        var res = await instance.post('/pre/get-user-info');
        console.log(res.data)
        var data = res.data.data;
        if (res.data.code == 0) {
            // 登陆状态
            sessionStorage.setItem('sess-isLogin', JSON.stringify(true));

            // 抽奖次数
            sessionStorage.setItem('sess-leftNum', JSON.stringify(data.user_info.left_num));

            // 是否分享twitter
            sessionStorage.setItem('sess-today-twitter', JSON.stringify(data.user_info.today_twitter));

            // 是否分享line
            sessionStorage.setItem('sess-today-line', JSON.stringify(data.user_info.today_line));

            //是否 关注官方推特账号
            sessionStorage.setItem('sess-isTwitter', JSON.stringify(data.user_info.is_twitter));

            // 是否 关注官方youtube账号
            sessionStorage.setItem('sess-isYoutube', JSON.stringify(data.user_info.is_youtube));

            //是否 关注官方discord
            sessionStorage.setItem('sess-isDiscord', JSON.stringify(data.user_info.is_discord));

            //名称
            sessionStorage.setItem('sess-receiveName', JSON.stringify(data.user_info.login_ymd));

            //邮箱，为空表示没有录入实物收货信息
            sessionStorage.setItem('sess-receiveMail', JSON.stringify(data.user_info.receive_mail));


            // 初始化
            $('#leftnum').text(data.user_info.left_num);

            // 将本页面分享到推特
            if (data.user_info.today_twitter == 1) {
                $('.taskbox .btn-task1').removeClass('task-not').addClass('task-end');
            }
            // 将本页面分享到LINE
            if (data.user_info.today_line == 1) {
                $('.taskbox .btn-task2').removeClass('task-not').addClass('task-end');
            }
            // 关注官方推特账号
            if (data.user_info.is_twitter == 1) {
                $('.rw_gzwx').addClass('btn_rwend');
                $('.taskbox .btn-task3').removeClass('task-not').addClass('task-end');
            }
            // 关注官方youtube账号
            if (data.user_info.is_youtube == 1) {
                $('.rw_gzwx').addClass('btn_rwend');
                $('.taskbox .btn-task4').removeClass('task-not').addClass('task-end');
            }
            // 关注官方discord
            if (data.user_info.is_discord == 1) {
                $('.rw_gztaptap').addClass('btn_rwend');
                $('.taskbox .btn-task5').removeClass('task-not').addClass('task-end');
            }


            // 首次登录弹出登录成功提示
            let sess_isLogin_tips = sessionStorage.getItem('sess-isLogin-tips');
            console.log(sess_isLogin_tips);

            if (!JSON.parse(sess_isLogin_tips)) {
                dialog.alertPop_msg('ログイン完了！');
                // if (data.user_info.today_line == 1 || data.user_info.today_twitter == 1) {
                //     dialog.alertPop_msg('ログイン完了！');
                // } else {
                //     // 弹出登录成功
                //     dialog.alertPop_msg('ログイン完了！<br/>矢を一本獲得しました！ ');
                // }

                let h = $('.page2').offset().top;
                $("html,body").animate({ "scrollTop": h - 20 }, 300);  //滚动到指定位置

                sessionStorage.setItem('sess-isLogin-tips', JSON.stringify(true));
            }
        }

        if (res.data.code == 2001) {
            layer.msg('キャンペーンは終了いたしました。');
        }
        if (res.data.code == 2002) {
            layer.msg('未開放');
        }
        if (res.data.code == 2003) {
            layer.msg('操作に失敗しました。後ほど再度お試しください。');
        }
    },
    /**
     * 分享 id
     * 1twitter
     * 2line
     */
    share: async function (id, url) {
        var res = await instance.post('/pre/share', {
            type: id
        });

        console.log(res.data)
        if (res.data.code == 0) {

            HeroApp.getUserInfo();

            setTimeout(() => {
                let aLink = document.createElement('a');
                let evt = document.createEvent("HTMLEvents");
                evt.initEvent("click", true, true);
                aLink.setAttribute("target", "_blank");
                aLink.href = url;
                aLink.click();
            }, 50);
        }

        if (res.data.code == 1001) {
            layer.msg('ログインに失敗しました。もう一度お試しください。');
        }
        if (res.data.code == 2001) {
            layer.msg('キャンペーンは終了いたしました。');
        }
        if (res.data.code == 2002) {
            layer.msg('未開放');
        }
        if (res.data.code == 2003 || res.data.code == 201) {
            layer.msg('操作に失敗しました。後ほど再度お試しください。');
        }
    },
    // 邮箱预约
    preEmail: async function (os, mail) {
        var res = await instance.post('/pre/index', {
            os_type: os,
            os_version: 1,
            dev: 1,
            mail: mail,
            required1: 1,
            required2: 1,
            required3: 1,
            required4: 1,
            required5: 1,
            required6: 1,
            required7: 1,
            required8: 1,
            required9: 1,
            required10: 1,
            required11: 1,
            required12: 1,
            required13: 1,
            required14: 1,
            required15: 1,
            required16: 1,
            required17: 1,
            required18: 1,
            required19: 1,
            required20: 1,
        });

        console.log(res.data)

        if (res.data.code == 0) {
            // 预约完成
            dialog.alertPop_preEndEmail();
        } else if (res.data.code == 202) {
            // 邮箱错误
            layer.msg('Please enter the correct email address');
        } else if (res.data.code == 206) {
            // 重复预约
            dialog.alertPop_preRepEmail();
        } else {
            layer.msg('Please try again later!');
        }
    }
}


$(function () {
    // 预约人数
    HeroApp.getBindPerson();

    $(document).on('click', '.os-type p', function (event) {
        event.preventDefault();

        $(this).toggleClass('curr').siblings().removeClass('curr');

    });

    $(document).on('click', '.emRadio', function (event) {
        event.preventDefault();
        $(this).toggleClass('curr');
    })

    // 弹出预约
    $(document).on('click', '.btn_pre_wrap,.btn-world-pre', function (event) {
        event.preventDefault();
        // 邮箱预约
        dialog.alertPop_preEmail();
    });

    // 预约
    $(document).on('click', '.pop-lobal-email .btn_email_up', function (event) {
        event.preventDefault();
        // 邮箱预约

        let os = null;
        let email = $('.Email').val();

        // 系统
        if ($('.os-type p').hasClass('curr')) {
            os = $('.os-type p.curr').attr('data-os');
        } else {
            layer.msg('Please select a mobile phone system first');
            return false;
        }
        // 邮箱
        if (!HeroApp.isEmail(email) || email == '') {
            $('.embox .tips').text('Please enter the correct email address').show();
            return false;
        } else {
            $('.embox .tips').text('').show();
        }

        // 协议
        if (!$('.emRadio').hasClass('curr')) {
            layer.msg('Please agree to the Privacy Policy and Terms of Service',{
                area: '8rem'
            });
            return false;
        }


        HeroApp.preEmail(os, email);
    });
});