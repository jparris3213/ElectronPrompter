const { app, BrowserWindow } = require('electron');


function createWindow() {
    const mainWindow = new BrowserWindow({
        width: Math.round(1920 * 0.2),
        height: 1000,
        backgroundColor: '#000000',
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile('index.html');

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});