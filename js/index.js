/*
 * @Author: Lee
 * @Date: 2021-07-06 09:24:04
 * @LastEditors: Lee
 * @LastEditTime: 2023-05-19 16:34:12
 * @Description:
 */

// https://blog.csdn.net/weixin_44074543/article/details/124585547
(function () {
  // 1. 初始化插件
  new VConsole();
  Toast.init();

  // 2. 获取必要的DOM元素
  var oTips = $('.tips');
  var oBrowserTips = $('.browser-tips');
  var oButtonDownload = $('.download-button');
  var oButtonOpenApp = $('.open-tips');

  // 3. 定义一些变量
  var referralCode = getQuery('referralCode');
  var env = getEnv();
  var isAnimating = false;
  var downloadUrl = '';
  console.log('邀请码：', referralCode);
  console.log('运行环境：', env);

  // 4. 控制默认显示
  switch (env) {
    // 微信环境，提示浏览器打开
    case 'weixin':
      oTips.classList.add('show');
      break;
    // iOS环境
    case 'ios':
      oButtonOpenApp.classList.add('show');
      break;
    // Android环境
    case 'android':
      oButtonOpenApp.classList.add('show');
      break;
    case 'unknown':
      oBrowserTips.classList.add('show');
      break;
  }
  // 5. 获取下载链接
  request(kURI_FOR_DOWNLOAD, {
    headers: {
      clientType: env,
    },
    success: function (resp) {
      downloadUrl = resp.data.link;
    },
    fail: function (errMsg) {
      Toast.info(errMsg);
    },
  });

  // 6. 事件 --- 唤醒APP
  oButtonOpenApp.onclick = function () {
    if (['ios', 'android'].indexOf(env) !== -1) {
      window.location.href = kSCHEME_URI;
    }
  };
  // 7. 事件 --- 下载APP
  oButtonDownload.onclick = function () {
    if (env === 'weixin') {
      // -- 微信环境
      if (isAnimating) {
        return;
      }
      isAnimating = true;
      oTips.classList.add('ani');
      var t = setTimeout(function () {
        isAnimating = false;
        oTips.classList.remove('ani');
        clearTimeout(t);
      }, 1000);
    } else {
      // -- 应用环境
      if (downloadUrl) {
        // 1. 直接跳转
        window.location.href = downloadUrl;
        // 2. 需要注册
        // var path = './register.html';
        // path += '?referralCode=' + referralCode;
        // path += '&downloadUrl=' + encodeURIComponent(downloadUrl);
        // window.location.href = path;
      } else {
        Toast.info('暂未开放，敬请期待！');
      }
    }
  };
})();
