/*
 * @Author: Lee
 * @Date: 2023-05-19 14:15:41
 * @LastEditors: Lee
 * @LastEditTime: 2023-05-19 15:03:53
 * @Description:
 */

/**
 * 原生js封装Toast
 */
var Toast = {
  /**
   * 节点
   */
  node: null,
  /**
   * 定时器
   */
  timer: null,
  /**
   * 初始化Toast组件实例
   */
  init: function () {
    var toastNode = document.createElement('div');
    toastNode.id = 'toast';
    toastNode.setAttribute('class', 'lg-toast');
    this.node = toastNode;
    document.body.appendChild(this.node);
  },
  /**
   * 显示Toast
   * @param {*} message 提示信息
   * @param {*} duration 持续时间，默认2000，单位毫秒
   * @returns
   */
  info: function (message, duration) {
    // 1. 处理默认值
    duration = duration ? duration : 2000;
    // 2. 确保上一次的 定时器 已被清空
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    // 3. 判断是否传入提示信息
    if (!message) {
      console.log('「Toast」：message 不能为空');
      return;
    }
    // 4. 判断节点是否存在
    if (!this.node) {
      console.log('「Toast」：未初始化');
      return;
    }
    // 5. 设置提示文本信息
    this.node.innerHTML = '<div class="lg-toast-content">' + message + '</div>';
    // 6. 显示Toast
    this.node.classList.add('show');
    // 7. 延迟隐藏
    var that = this;
    this.timer = setTimeout(function () {
      that.node.classList.remove('show');
      that.timer = null;
    }, duration);
  },
  /**
   * Loading
   * @param {*} message
   */
  loading: function (message) {
    if (!message || !this.node) {
      return;
    }
    this.node.innerHTML = '<div class="lg-toast-content">' + message + '</div>';
    this.node.classList.add('show');
  },
  /**
   * 隐藏Toast
   */
  hide: function () {
    if (this.node) {
      this.node.classList.remove('show');
    }
  },
};
