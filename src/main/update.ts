import { autoUpdater } from 'electron-updater'
import { BrowserWindow, dialog } from 'electron'
import log from 'electron-log'

export function update(win: BrowserWindow) {
  // Configure log
  log.transports.file.level = 'info'
  autoUpdater.logger = log

  // Configure updater events
  autoUpdater.on('checking-for-update', () => {
    log.info('Checking for update...')
  })

  autoUpdater.on('update-available', (info) => {
    log.info('Update available:', info)
    win.webContents.send('update-available')
  })

  autoUpdater.on('update-not-available', (info) => {
    log.info('Update not available:', info)
  })

  autoUpdater.on('error', (err) => {
    log.error('Error in auto-updater:', err)
  })

  autoUpdater.on('download-progress', (progressObj) => {
    let logMessage = `Download speed: ${progressObj.bytesPerSecond}`
    logMessage = `${logMessage} - Downloaded ${progressObj.percent}%`
    logMessage = `${logMessage} (${progressObj.transferred}/${progressObj.total})`
    log.info(logMessage)
    win.webContents.send('download-progress', progressObj)
  })

  autoUpdater.on('update-downloaded', (info) => {
    log.info('Update downloaded:', info)
    
    // Prompt user to install update
    dialog.showMessageBox({
      type: 'info',
      title: 'Update Ready',
      message: 'A new version of Chasm Dental Billing Platform is ready to install',
      detail: 'The application will restart to install the update',
      buttons: ['Install and Restart', 'Later'],
      defaultId: 0,
      cancelId: 1
    }).then(({ response }) => {
      if (response === 0) {
        autoUpdater.quitAndInstall(false, true)
      }
    })
  })

  // Check for updates
  autoUpdater.checkForUpdatesAndNotify()
  
  // Check for updates every hour
  setInterval(() => {
    autoUpdater.checkForUpdatesAndNotify()
  }, 60 * 60 * 1000)
}
