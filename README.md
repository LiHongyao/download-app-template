# 概述

在实际应用中，你可能需要开发一个H5页面用于下载，这在裂变中，经常可见，可能用户会通过一个链接进入下载页，并执行注册绑定上下级关系。为了便于后续使用，特意开发此示例，仅供各位参考。

> **注意：**此示例完全基于HTML+CSS+JavaScript实现，无任何依赖。


# 文件目录

```
.
├── css
		├── index.css      # 下载页样式
		├── normalized.css # 格式化 
    └──	register.css   # 注册页样式    
├── images # 图片资源
├── js           
		├── index.js      # 下载页脚本
    └──	register.js   # 注册页脚本
├── libs    
		├── constant.js   # 常量定义
		├── rem.js        # 移动端适配
    └──	utils.js      # 工具函数
├── plugins           # 插件
├── index.html        # 下载页
└── register.html     # 注册页
```

# 思路

1. 用户点击分享链接或识别二维码进入落地页（下载页）（链接上可携带邀请码）
2. 下载页
   - 判断设备环境
     - 微信环境：提示用户在浏览器打开
     - 应用环境：ios/Android
   - 获取链接上的邀请码（location.search）
   - 根据设备环境（ios/Android）调用后端接口获取下载链接
     - ios：通常为应用市场链接
     - Android：通常为apk文件，直接在浏览器下载
   - 判断是否需要注册
     - 需要：拼接跳转地址，携带邀请码和下载链接，跳转至注册页
     - 无需：直接跳转下载链接
3. 注册页
   - 输入手机号
   - 获取验证码
   - 勾选用户协议和隐私政策
   - 注册
   - 跳转下载

# 调用者注意事项

1. 你可以根据你的需求来重新布局页面
2. 你应该在 **`libs/constants.js`** 文件中配置信息（基本上是和请求地址相关的配置）
3. 你应该根据需求判断是否需要到注册页，如果你不需要注册，修改代码位置在 **`js/index.js`** 底部位置

# 演示效果

![](./images/example_1.png)

![](./images/example_2.png)

