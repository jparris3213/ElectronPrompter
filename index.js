const { app, BrowserWindow, ipcMain } = require('electron');

// Declare mainWindow and controlWindow at a higher scope
let mainWindow;
let controlWindow;

function createDisplayWindow() {
    mainWindow = new BrowserWindow({
        width: 1920,
        height: 600,
        backgroundColor: '#000000',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile('index.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

function createControllerWindow() {
    controlWindow = new BrowserWindow({
        width: 750,
        height: 300,
        backgroundColor: '#000000',
        fontcolor: '#ffffff',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    controlWindow.loadFile('controller.html');

    controlWindow.on('closed', () => {
        controlWindow = null;
    });
}

app.on('ready', () => {
    createDisplayWindow();
    createControllerWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (!mainWindow) {
        createDisplayWindow();
    }
    if (!controlWindow) {
        createControllerWindow();
    }
});

ipcMain.on('start-timer', (event, data) => {
    // Now mainWindow is correctly referenced
    console.log("recieved Start");
    if (mainWindow) {
        mainWindow.webContents.send('start-timer', data);
    }
});

ipcMain.on('stop-timer', (event, data) => {
    console.log("recieved Stop");
    // Now mainWindow is correctly referenced
    if (mainWindow) {
        mainWindow.webContents.send('stop-timer', data);
    }
});

ipcMain.on('refresh-index', () => {
    if (mainWindow) {
        mainWindow.reload();
    }   
})
ipcMain.on('reset-timer', (event, data) => {
    // Now mainWindow is correctly referenced
    if (mainWindow) {
        mainWindow.webContents.send('reset-timer', data);
    }
});