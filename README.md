# 开发文档

## 开发环境
* 确定全局安装了这些模块 `npm i -g gulp nw`
* 当前目录执行 `npm i` 安装开发阶段用到的模块
* 配置 WebStorm 的调试设置，新建 node-webkit配置项目，指定如下：
    * 指定node-webkit app 为当前目录
    * 指定working directory 为当前目录
    * 指定node-webkit解释器为：`/usr/local/lib/node_modules/nw/bin/nw`
