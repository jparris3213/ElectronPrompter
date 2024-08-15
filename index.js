const { app, BrowserWindow, ipcMain, WebContentsView} = require('electron');

// Declare mainWindow and controlWindow at a higher scope
let mainWindow;
let controlWindow;
let chat_1;

function add_chat_window(website, y) {
    chat_1 = new WebContentsView();
    mainWindow.contentView.addChildView(chat_1);
    chat_1.webContents.loadURL(website);
    chat_1.setBounds({ x: 0, y: y, width: 1920/2, height: 400 })

}

function createDisplayWindow() {
    mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        backgroundColor: '#000000',
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    

    mainWindow.loadFile('index.html');
    //mainWindow.removeMenu();
    //add_chat_window("https://www.instagram.com/typefortyproductions", 0);
    //add_chat_window("https://www.facebook.com/live/producer/dashboard/2845210015632521/COMMENTS/", 0);
    //add_chat_window("https://www.tiktok.com", 400);

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