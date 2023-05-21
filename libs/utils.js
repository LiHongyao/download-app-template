/*
 * @Author: Lee
 * @Date: 2021-07-06 09:24:01
 * @LastEditors: Lee
 * @LastEditTime: 2023-05-21 10:16:49
 * @Description:
 */

/**
 * 获取元素
 * @param {*} selector
 * @returns
 */
function $(selector) {
  return document.querySelector(selector);
}

/**
 * 获取query参数
 * @param {*} key
 * @returns
 */
function getQuery(key) {
  var search = window.location.search;
  if (search) {
    search = search.slice(1);
    var arr = search.split('&');
    var map = {};
    for (var i = 0; i < arr.length; i++) {
      var _ = arr[i].split('=');
      var k = _[0];
      var v = _[1];
      map[k] = v;
    }
    return key ? map[key] || null : map;
  }
  return null;
}

function getEnv() {
  var ua = window.navigator.userAgent;
  console.log(ua);
  if (/MicroMessenger/i.test(ua)) {
    return 'weixin';
  } else if (/Linux|Android/i.test(ua)) {
    return 'android';
  } else if (/iPhone/i.test(ua)) {
    return 'ios';
  } else {
    return 'unknown';
  }
}

/**
 * 网络请求
 * @param {String} url 请求连接
 * @param {Object} options 配置项
 * @param {String} options.method 请求方法
 * @param {Object} options.headers 请求头
 * @param {Object} options.data 携带参数(POST)
 * @param {Object} options.params 携带参数(GET)
 * @param {Function} options.success 请求成功
 * @param {Function} options.fail 请求失败
 */
function request(url, options) {
  // 1. 创建请求对象
  let xhr = new XMLHttpRequest();
  // 2. 处理GET参数
  if ((!options.method || /GET/i.test(options.method)) && options.params) {
    url += '?';
    for (var k in options.params) {
      url += k + '=' + options.params[k] + '&';
    }
    url = url.slice(0, -1);
  }
  console.log('请求连接：', url);
  // 3. 配置请求
  xhr.open(options.method || 'GET', url, true);
  // -> 设置请求头
  xhr.setRequestHeader('Content-Type', 'application/json');
  if (options.headers) {
    for (var k in options.headers) {
      xhr.setRequestHeader(k, options.headers[k]);
    }
  }
  // -> 设置响应类型
  xhr.responseType = 'json';
  // 4. 发送请求
  xhr.send(options.data ? JSON.stringify(options.data) : null);
  // 5. 监听请求
  xhr.onload = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var resp = xhr.response;
      console.log('响应数据：', resp);
      if (resp && resp.code === 0) {
        options.success && options.success(resp);
      } else {
        options.fail && options.fail(resp.msg || '服务器忙，请稍后再试');
      }
    } else {
      options.fail && options.fail('网络异常，请稍后再试');
    }
  };
  // 6. 监听异常
  xhr.onerror = function () {
    options.fail && options.fail('网络异常，请稍后再试');
  };
}
