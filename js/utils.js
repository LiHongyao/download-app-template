/*
 * @Author: Lee
 * @Date: 2021-07-06 09:24:01
 * @LastEditors: Lee
 * @LastEditTime: 2021-07-06 10:17:06
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
      element.src = "https://ddhbc.oss-cn-beijing.aliyuncs.com/images/0706_20210706100314.png";
      break;
    case "ios":
      element.src = "https://ddhbc.oss-cn-beijing.aliyuncs.com/images/0706_20210706100348.png";
      break;
    default:
  }
}
