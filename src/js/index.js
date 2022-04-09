const { app, ipcMain, BrowserWindow } = require('electron');
const fs = require('fs');

let win;
let iconpath = __dirname + '/icon.png';
let appIcon = null;

async function createWindow() {
    win = new BrowserWindow({
        height: 728,
        width: 1200,
        minWidth: 1200,
        minHeight: 728,
        frame: false,
        maximizable: true,
        minimizable: true,
        resizable: true,
        title: 'TGS',
       // icon: __dirname + '/icon.png',
        webPreferences: {
          webgl: true,
          nodeIntegration: true,
          contextIsolation: false,
          //devTools: false
        }
    })
    win.setTitle('Docker');
    win.loadFile('src/html/index.html');
    win.webContents.openDevTools();

    win.on('close', function (event) { app.isQuiting = true, app.quit() })

    CreateStorage()
}

function CreateStorage() {
    var dir = './containers';

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}

// IPCMAIN Functions
ipcMain.on('app-restart', () => { app.relaunch(); app.exit(); });
ipcMain.on('app-dev', () => { win.webContents.openDevTools(); });
ipcMain.on('maximize-window', () => { win.setFullScreen(!win.isFullScreen()) });
ipcMain.on('minimize-window', () => { win.minimize(); });
ipcMain.on('resize-window', () => { win.setSize(1200, 728); });
ipcMain.on('close-window', () => { win.close(); });
ipcMain.on('open-index', () => { win.loadFile('src/html/index.html'); });

app.whenReady().then(createWindow);
app.on('before-quit', function() { Tray.destroy(); });
app.on('window-all-closed', function(){ if(process.platform !== 'darwin'){ app.quit(); }});
app.on('activate', () => { if (Glasstron.BrowserWindow.getAllWindows().length === 0) { createWindow(); } });