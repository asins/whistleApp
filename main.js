const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({ width: 1100, height: 700, minWidth: 1100, minHeight: 700 });

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true,
    }));

    // Open the DevTools.
    //   win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

app.once('ready', () => {

    const template = [{
        label: '修改',
        submenu: [
            { role: 'undo', label: '撤销' },
            { role: 'redo', label: '重做' },
            { type: 'separator' },
            { role: 'cut', label: '剪切' },
            { role: 'copy', label: '复制' },
            { role: 'paste', label: '粘贴' },
            { role: 'delete', label: '删除' },
            { role: 'selectall', label: '全选' },
        ],
    }, {
        label: '视图',
        submenu: [
            { id: 'reload', label: '重新加载', accelerator: 'Command+R', click: handleMenuClick },
            { id: 'devtools', label: '开发者工具', accelerator: 'Command+Option+I', click: handleMenuClick },
            { type: 'separator' },
            { role: 'togglefullscreen' },
        ],
    }, {
        label: '窗口',
        role: 'window',
        submenu: [
            { role: 'minimize', label: '最小化' },
            { role: 'quit', label: '关闭' },
        ],
    }];

    if (process.platform === 'darwin') {
        template.unshift({
            label: 'Whistle',
            submenu: [
                { role: 'about', label: '关于Whistle' },
                { type: 'separator' },
                { id: 'update', label: '更新Whistle...', click: handleMenuClick },
                { id: 'setport', label: '代理端口设置...', click: handleMenuClick },
                { type: 'separator' },
                { role: 'hide', label: '隐藏' },
                { role: 'hideothers', label: '隐藏其他应用' },
                { role: 'unhide', label: '显示全部' },
                { type: 'separator' },
                { role: 'quit', label: '退出' },
            ],
        });
    }

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

});

ipcMain.on('reload', () => {
    win.reload();
});

function handleMenuClick(menuItem, browserWindow, event) {
    if (menuItem.id == 'reload') {
        win.reload();
    }
    if (menuItem.id == 'update') {
        win.webContents.send('update');
    }
    if (menuItem.id == 'setport') {
        win.webContents.send('showPortSetting');
    }
    if (menuItem.id == 'devtools') {
        if (win.webContents.isDevToolsOpened()) {
            win.webContents.closeDevTools();
        } else {
            win.webContents.openDevTools({ mode: 'bottom' });
        }
    }
}
