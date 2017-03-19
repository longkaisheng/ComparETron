'use strict'
const { app, BrowserWindow } = require('electron');
const chokidar = require('chokidar'); // Hot reloading

let mainWindow;

app.on('ready', createWindow) // called when electron has initialized

// tell chokidar to watch these files for changes
// reload the window if there is one
chokidar.watch(['ports.js', 'index.html', 'elm.js']).on('change', () => {
  if (mainWindow) {
    mainWindow.reload()
  }
})

// This will create our app window, no surprise there
function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1024, 
    height: 768
  })

  // display the index.html file
  mainWindow.loadURL(`file://${ __dirname }/index.html`)
  
  // open dev tools by default so we can see any console errors
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

/* Mac Specific things */
// when you close all the windows on a non-mac OS it quits the app
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { 
    app.quit() 
  }
});

// if there is no mainWindow it creates one (like when you click the dock icon)
app.on('activate', () => {
  if (mainWindow === null) { 
    createWindow() 
  }
});