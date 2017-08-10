# whistleApp

使用 electron 对 whistle 进行封装的客户端版本

## 特点

- 支持修改 whistle 的监听端口
- 可打开开发者工具查看 whistle 的工作输出
- 对 Mac 系统提供一键更新 Whistle 版本

## 构建方式

使用`electron-packager`做 App 生成工具包

```js
// 安装依赖包
npm install --registry=https://registry.npm.taobao.org

// 构建程序会自动生成到 dist 目录
npm run buildMac // Mac
npm run buildWin // Window
```

Window 版本我只让生成 X64 版本，如果你的系统是 x32 的请修改`package.json`中的`--arch=x64`为`x32`。
