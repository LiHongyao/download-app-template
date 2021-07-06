/*
 * @Author: Lee
 * @Date: 2021-07-06 09:24:04
 * @LastEditors: Lee
 * @LastEditTime: 2021-07-06 10:15:43
 * @Description:
 */

(function () {
  // 1. 获取必要的DOM元素
  var oTips = document.querySelector(".tips");
  var oEnvImg = document.querySelector(".icon-env");
  var oButtonDownload = document.querySelector(".download-button");
  var oButtonOpenApp = document.querySelector(".open-tips");
  var oDialog = document.querySelector(".dialog");
  // 2. 获取当前运行环境
  var env = getEnv();
  // 3. 控制默认显示
  setEnvImg(oEnvImg, env);
  if (env === "weixin") {
    oTips.classList.add("show");
  } else {
    oEnvImg.classList.add("show");
    oButtonOpenApp.classList.add("show");
  }
  if (env === "ios") {
    oButtonDownload.textContent = "即将开放";
  }
  // 4. 事件 --- 唤醒APP
  oButtonOpenApp.addEventListener(
    "click",
    function () {
      if (env === "android") {
        window.location.href = "ddhb://www.ddhb.com";
      }
    },
    false
  );
  // 5. 事件 --- 下载APP
  oButtonDownload.addEventListener(
    "click",
    function () {
      switch (env) {
        case "weixin":
          oTips.classList.add("ani");
          var t = setTimeout(function () {
            oTips.classList.remove("ani");
            clearTimeout(t);
          }, 1000);
          break;
        case "android":
          window.location.href =
            "https://ddhbc.oss-cn-beijing.aliyuncs.com/app/ddhb_1.2.4.apk";
          break;
        case "ios":
          oDialog.classList.add("show");
          var t = setTimeout(function () {
            oDialog.classList.remove("show");
            clearTimeout(t);
          }, 1000);
          break;
      }
    },
    false
  );
})();
