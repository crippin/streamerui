const {app, BrowserWindow} = require('electron')
const path = require('path')
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
function createWindow () {
  win = new BrowserWindow({width: 1920, height: 1080,kiosk: true,
    webSecurity: false}) 
  win.webContents.openDevTools()
  win.loadURL(`file://${path.join(__dirname, 'build/index.html')}`)
}
app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required")
app.on('ready', createWindow)