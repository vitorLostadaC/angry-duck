import { BrowserWindow, screen } from 'electron'
import path, { join } from 'node:path'
import { version } from '../../package.json'

import { registerRoute } from '../shared/lib/electron-router-dom'
import { createTray } from './lib/tray'

type Route = Parameters<typeof registerRoute>[0]

interface WindowProps extends Electron.BrowserWindowConstructorOptions {
	id: Route['id']
	query?: Route['query']
}

export function createWindow({ id, query, ...options }: WindowProps) {
	const window = new BrowserWindow({
		width: 600,
		height: 250,
		show: false,
		resizable: false,
		alwaysOnTop: true,

		webPreferences: {
			preload: path.join(__dirname, '../preload/index.js'),
			contextIsolation: true
		},

		...options
	})

	registerRoute({
		id,
		query,
		browserWindow: window,
		htmlFile: path.join(__dirname, '../renderer/index.html')
	})

	window.on('ready-to-show', () => {
		window.show()
	})

	return window
}

export function createMainWindow() {
	const primaryDisplay = screen.getPrimaryDisplay()
	const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize
	const workArea = primaryDisplay.workArea

	// Determine window type based on platform
	const windowType = (): 'toolbar' | 'desktop' | 'dock' => {
		switch (process.platform) {
			case 'win32':
				return 'toolbar'
			case 'linux':
				return 'dock' // Use dock type for Linux to avoid desktop type issues
			default:
				return 'desktop'
		}
	}

	const mainWindow = createWindow({
		id: 'main',
		width: screenWidth,
		height: screenHeight,

		x: workArea.x,
		y: workArea.y,
		frame: false,
		transparent: true,
		alwaysOnTop: true,
		skipTaskbar: true,
		focusable: false,
		resizable: false,
		movable: false,
		minimizable: false,
		maximizable: false,
		hasShadow: false,
		show: false,
		type: windowType(),
		webPreferences: {
			preload: join(__dirname, '../preload/index.js'),
			sandbox: false,
			nodeIntegration: false,
			contextIsolation: true,
			backgroundThrottling: false
		},
		query: {
			version
		}
	})

	mainWindow.setIgnoreMouseEvents(true, { forward: true })
	mainWindow.webContents.openDevTools()

	createTray(mainWindow)

	mainWindow.on('closed', () => {
		for (const browserWindow of BrowserWindow.getAllWindows()) {
			browserWindow.close()
		}
	})
}

export function createSettingsWindow() {
	return createWindow({
		id: 'settings',
		width: 774,
		height: 488,
		resizable: false,
		title: 'Configurações',
		show: false,
		titleBarStyle: 'hiddenInset',
		trafficLightPosition: {
			x: 16,
			y: 16
		},
		backgroundColor: '#151414',
		autoHideMenuBar: true,
		frame: true,
		roundedCorners: true,
		webPreferences: {
			preload: join(__dirname, '../preload/index.js'),
			sandbox: false,
			nodeIntegration: false,
			contextIsolation: true
		}
	})
}
