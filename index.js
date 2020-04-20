const {
  app,
  BrowserWindow
} = require('electron')

const debug = /--debug/.test(process.argv[2])

let mainWindow = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })
  
  mainWindow.loadFile('index.html')

  if (debug) {
    mainWindow.webContents.openDevTools()
    mainWindow.maximize()
  }
}

app.on('ready', createWindow)
