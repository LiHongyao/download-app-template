/*
 * @Author: Lee
 * @Date: 2021-07-06 09:24:01
 * @LastEditors: Lee
 * @LastEditTime: 2021-09-02 13:00:32
 * @Description:
 */

function getEnv() {
  var _userAgent = window.navigator.userAgent;
  if (/MicroMessenger/i.test(_userAgent)) {
    return "weixin";
  } else if (/Linux|Android/i.test(_userAgent)) {
    return "android";
  } else if (/iPhone/i.test(_userAgent)) {
    return "ios";
  } else {
    return "unknown";
  }
}

function setEnvImg(element, env) {
  switch (env) {
    case "android":
      element.src = "/images/icon_android_1.png";
      break;
    case "ios":
      element.src = "/images/icon_ios_1.png";
      break;
    default:
  }
}
