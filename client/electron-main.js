const path = require('path')
// const url = require('url')
const electron = require('electron')
const { Menu, Tray, dialog, app, BrowserWindow } = electron
const ipc = electron.ipcMain

let win
let splashWin
let appIcon = null

const showSplashScreen = () => {
    const modalPath = path.join('file://', __dirname, 'public', 'splash-screen.html')
    splashWin = new BrowserWindow({ frame: false })
    splashWin.on('close', () => {
        splashWin = null
    })

    console.log(process.env['ELECTRON_START_URL'])
    console.log(process.env['DEV_MODE'])
    if (process.env.DEV_MODE === 'true') {
        splashWin.webContents.openDevTools()
    }

    splashWin.loadURL(modalPath)
    splashWin.show()
}

const showMainWindow = () => {
    win = new BrowserWindow({ width: 800, height: 600 })

    if (process.env.DEV_MODE) {
        win.webContents.openDevTools()
    }

    win.on('closed', () => {
        putInTray()
        // win = null
    })

    win.webContents.on('crashed', () => {
        const options = {
            type: 'info',
            title: 'Oops... Sorry!',
            message: 'There was an unexpected problem.',
            buttons: ['Reload', 'Close'],
        }
        dialog.showMessageBox(options, index => {
            index === 0 ? win.reload() : win.close()
        })
    })

    win.on('unresponsive', () => {
        const options = {
            type: 'info',
            title: 'Oops... Sorry!',
            message: 'The application is hanging.',
            buttons: ['Reload', 'Wait', 'Close'],
        }
        dialog.showMessageBox(options, index => {
            index === 0 ? win.reload() : win.close()
        })
    })

    win.on('responsive', () => {
        // Do something when the window is responsive again
        console.log('We\'re back!')
    })

    win.loadURL('http://localhost:3001')

    win.show()
    win.focus()
}

const registerGlobalShortcuts = () => {
    console.log('register shortcuts')
}

ipc.on('open-file-dialog', event => {
    dialog.showOpenDialog(
        {
            properties: ['openFile', 'openDirectory'],
        },
        files => {
            if (files) {
                event.sender.send('selected-directory', files)
            }
        }
    )
})

const putInTray = event => {
    const iconPath = path.join(__dirname, 'public', 'favicon.ico')
    appIcon = new Tray(iconPath)
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Remove',
            click() {
                event.sender.send('tray-removed')
            },
        },
    ])
    appIcon.setToolTip('Projectplace Demo in the tray')
    appIcon.setContextMenu(contextMenu)

    const options = {
        type: 'info',
        title: 'Put in tray',
        message: 'The icon should be in the tray.',
        buttons: ['Close'],
    }
    dialog.showMessageBox(options, index => {
        index === 0 && win.close()
    })
}

ipc.on('put-in-tray', putInTray)
ipc.on('remove-tray', () => {
    appIcon && appIcon.destroy()
})

app.on('ready', () => {
    showSplashScreen()
    setTimeout(() => {
        splashWin.close()
        showMainWindow()
        registerGlobalShortcuts()
    }, 2000)
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
        appIcon && appIcon.destroy()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        showMainWindow()
    }
})

app.on('will-quit', () => {
    // globalShortcut.unregisterAll()
})
