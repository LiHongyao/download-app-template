/*
 * @Author: Lee
 * @Date: 2023-05-19 11:10:28
 * @LastEditors: Lee
 * @LastEditTime: 2023-05-21 10:19:51
 * @Description:
 */
(function () {
  // 1. 初始化插件
  Toast.init();
  new VConsole();
  // 2. 获取DOM元素
  var oMobile = $('.mobile');
  var oCaptcha = $('.captcha');
  var oCheckbox = $('.checked');
  var oCount = $('.send.count');
  var oSendBtn = $('.send.btn');
  var oSubmit = $('.submit-btn');

  // 3. 定义变量
  var timer = null;
  var count = 60;
  var query = getQuery();
  var referralCode = query.referralCode;
  var downloadUrl = query.downloadUrl;
  console.log('邀请码：', referralCode);
  console.log('下载链接：', downloadUrl);
  // 4. 发送验证码
  oSendBtn.onclick = function () {
    // -- 校验手机号
    var mobile = oMobile.value;
    if (!mobile) {
      Toast.info('请输入手机号');
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(mobile)) {
      Toast.info('手机号格式错误');
      return;
    }

    // -- 发送验证码
    request(kURI_FOR_CAPTCHA, {
      params: {
        phone: mobile,
      },
      success: function () {
        Toast.info('验证码已发送');
        // -- 启用倒计时
        oCount.textContent = count + '秒后重新获取';
        oSendBtn.classList.remove('show');
        oCount.classList.add('show');
        timer = setInterval(function () {
          count--;
          oCount.textContent = count + '秒后重新获取';
          if (count === 0) {
            clearInterval(timer);
            timer = null;
            oSendBtn.classList.add('show');
            oCount.classList.remove('show');
            count = 60;
          }
        }, 1000);
      },
      fail: function (msg) {
        Toast.info(msg);
      },
    });
  };
  // 5. 点击注册
  oSubmit.onclick = function () {
    // -- 获取值
    var mobile = oMobile.value;
    var captcha = oCaptcha.value;
    var checked = oCheckbox.checked;
    // -- 表单校验
    if (!mobile) {
      Toast.info('请输入手机号');
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(mobile)) {
      Toast.info('手机号格式错误');
      return;
    }
    if (!captcha) {
      Toast.info('请输入验证码');
      return;
    }
    if (!checked) {
      Toast.info('请阅读并同意隐私协议和用户协议');
      return;
    }
    // -- 执行注册
    Toast.loading('注册中...');
    request(kURI_FOR_REGISTER, {
      method: 'POST',
      data: {
        phone: mobile,
        code: captcha,
        referralCode: referralCode || undefined,
      },
      success: function () {
        Toast.hide();
        Toast.info('注册成功，请勿重复操作');
        window.location.href = decodeURIComponent(downloadUrl);
      },
      fail: function (msg) {
        Toast.info(msg);
      },
    });
  };
})();
