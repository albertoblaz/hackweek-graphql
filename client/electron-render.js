const shell = require('electron').shell

const os = require('os')

const fileManagerBtn = document.getElementById('open-file-manager')

// TODO open external link from notification
// shell.openExternal('http://electron.atom.io')

fileManagerBtn.addEventListener('click', event => {
    shell.showItemInFolder(os.homedir())
})
