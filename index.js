const {
  app,
  BrowserWindow
} = require('electron')
const Store = require('electron-store');
const store = new Store();
const debug = /--debug/.test(process.argv[2])

let mainWindow = null

store.set('unicorn', 'Azaza');
console.log(store.get('unicorn'));

function initialize() {

  function createWindow() {
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        allowRunningInsecureContent: false
      }
    })

    mainWindow.loadFile('index.html')

    if (debug) {
      mainWindow.webContents.openDevTools()
      mainWindow.maximize()
      require('devtron').install()
    }

    mainWindow.on('closed', () => {
      mainWindow = null
    })
  }

  app.on('ready', createWindow)

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
}

initialize()
