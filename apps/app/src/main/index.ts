import { electronApp, optimizer } from '@electron-toolkit/utils'
import { BrowserWindow, app } from 'electron'
import { createMainWindow } from './factories'

import './lib/ipc'
import './lib/store'

const hasSingleInstanceLock = app.requestSingleInstanceLock()

if (!hasSingleInstanceLock) {
	app.quit()
	process.exit(0)
}

app.on('second-instance', () => {
	const [mainWindow] = BrowserWindow.getAllWindows()

	if (mainWindow) {
		if (mainWindow.isMinimized()) mainWindow.restore()
		mainWindow.focus()
	}
})

app.whenReady().then(() => {
	if (process.platform === 'darwin') {
		app.dock?.hide()
	}

	electronApp.setAppUserModelId('com.electron')

	app.on('browser-window-created', (_, window) => {
		optimizer.watchWindowShortcuts(window)
	})

	createMainWindow()

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createMainWindow()
		}
	})
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})
