const { app, BrowserWindow } = require('electron');
const url = require("url");
const path = require("path");

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, '/dist/bloodlevel/index.html'),
      protocol: "file:",
      slashes: true
    })
  );
}

app.whenReady().then( () => {
  createWindow()

  app.on('activate', () => {

    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') app.quit()
})

