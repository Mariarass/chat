import { app, BrowserWindow, shell, screen, session } from 'electron';
import { join } from 'path';
import { productName } from "../package.json";

import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";


let mainWindow: BrowserWindow | null = null

function createWindow() {
    const screenSize = screen.getPrimaryDisplay().workAreaSize

    mainWindow = new BrowserWindow({
        // icon: join(__dirname, "../../src/assets/vue.svg"),
        title: `${productName}`,
        minWidth: 650,
        minHeight: 550,
        width: 800,
        height: screenSize.height - 150,
        resizable: true,
        maximizable: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    if (process.env.VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
        mainWindow.webContents.openDevTools()
        mainWindow.maximize()
    } else {
        mainWindow.loadFile(join(process.env.BUILD_APP, 'index.html'))
    }


    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('https:')) shell.openExternal(url)
        return { action: 'deny' }
    })
}

app.whenReady().then(async () => {
    if (process.env.VITE_DEV_SERVER_URL) {

        try {
            await installExtension(VUEJS_DEVTOOLS);
        } catch (e) {
            console.error("Vue Devtools failed to install:", e.toString());
        }
    }

    createWindow();

    // header security policy
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        callback({
            responseHeaders: {
                ...details.responseHeaders,
                'Content-Security-Policy': ['script-src \'self\'']
            }
        })
    })

    app.on('activate', () => {

        const allWindows = BrowserWindow.getAllWindows()
        allWindows.length === 0 ? createWindow() : allWindows[0].focus();
    });

});

app.on('window-all-closed', () => {
    mainWindow = null
    if (process.platform !== 'darwin') app.quit();
});

