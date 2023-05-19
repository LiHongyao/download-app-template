/*
 * @Author: Lee
 * @Date: 2023-05-19 10:43:27
 * @LastEditors: Lee
 * @LastEditTime: 2023-05-19 11:27:20
 * @Description:
 */

/**
 * 参考文章：http://t.csdn.cn/bHAff
 * 1. Vscode 扩展配置：搜索安装 pxtorem  → 设置 Root Font Size:100
 * 2. 如果参照设计稿尺寸750，则将下方clientWidth置为750即可
 */

(function (doc, win) {
  // 1. 获取根元素
  var docEl = doc.documentElement;
  // 2. 获取事件名（横竖屏切换/调整视窗尺寸）
  var resizeEvt =
    'orientationchange' in window ? 'orientationchange' : 'resize';
  // 3.recalc改变font-size值的大小
  var recalc = function () {
    // 获取设备宽度
    var clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    if (clientWidth >= 750) {
      docEl.style.fontSize = '100px';
    } else {
      docEl.style.fontSize = (clientWidth / 750) * 100 + 'px';
    }
  };

  // 4.动态监听事件
  if (!doc.addEventListener) return;
  // 在你屏幕发生旋转，或者是放大缩小时重新计算
  win.addEventListener(resizeEvt, recalc, false);
  // 在你的页面初始化的时候执行上面的函数，DOMContentLoaded文档加载完成不包含图片资源 onload包含图片资源
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
