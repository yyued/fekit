# 简介


## 功能说明

## 下载地址
* [osx64][2]
* [win64][3]

## 开发环境
* 确定全局安装了这些模块 `npm i -g gulp nw`
* 当前目录执行 `npm i` 安装开发阶段用到的模块
* 配置 WebStorm 的调试设置，新建 node-webkit配置项目，指定如下：
    * 指定node-webkit app 为当前目录
    * 指定working directory 为当前目录
    * 指定node-webkit解释器为：`/usr/local/lib/node_modules/nw/bin/nw`
    * 在environment variable添加环境变量
        * 键：PATH
        * 值：命令行执行`echo "$PATH"` 复制该值


## 构建环境
* 安装构建模块 `npm i -g node-webkit-builder`
* 在任意目录执行 `nwbuild <path-to-nwapp>`，[详细][1]

[1]: https://github.com/mllrsohn/node-webkit-builder
[2]: http://pan.baidu.com/s/1sjkepCL#path=%252Ffekit%252Fosx64
[3]: http://pan.baidu.com/s/1sjkepCL#path=%252Ffekit%252Fwin64
