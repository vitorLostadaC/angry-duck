import { IPC } from '@shared/constants/ipc'
import type {
	GetStoreResponse,
	TakeScreenshotResponse,
	UpdateStoreRequest,
	UpdateStoreResponse
} from '@shared/types/ipc'
import type { IpcMainInvokeEvent, WebContents } from 'electron'
import { desktopCapturer, ipcMain, screen } from 'electron'
import type { Store } from '~/src/shared/types/store'
import { createSettingsWindow } from '../factories'
import { store } from './store'

ipcMain.handle(IPC.ACTIONS.TAKE_SCREENSHOT, async (): Promise<TakeScreenshotResponse> => {
	try {
		const sources = await desktopCapturer.getSources({
			types: ['screen'],
			thumbnailSize: {
				width: screen.getPrimaryDisplay().workAreaSize.width,
				height: screen.getPrimaryDisplay().workAreaSize.height
			}
		})

		if (sources.length === 0) {
			throw new Error('No screen sources found')
		}

		const primarySource = sources[0]

		if (!primarySource) {
			throw new Error('No primary source found')
		}

		const thumbnail = primarySource.thumbnail.toDataURL()
		return {
			screenshot: thumbnail
		}
	} catch (err) {
		console.error('Error taking screenshot:', err)
		return {
			screenshot: null
		}
	}
})

ipcMain.handle(IPC.STORE.GET_STORE, async (): Promise<GetStoreResponse> => {
	return {
		store: store.store
	}
})

ipcMain.handle(
	IPC.STORE.UPDATE_STORE,
	async (_, { store: storeData }: UpdateStoreRequest): Promise<UpdateStoreResponse> => {
		const updatedStore: Store = { ...store.store, ...storeData }

		for (const key of Object.keys(updatedStore) as (keyof Store)[]) {
			store.set(key, updatedStore[key])
		}

		return {
			store: updatedStore
		}
	}
)

ipcMain.handle(IPC.WINDOWS.CREATE_SETTINGS, async (event: IpcMainInvokeEvent): Promise<void> => {
	const mainWebContents: WebContents = event.sender

	const settingsWindow = createSettingsWindow()

	settingsWindow.on('closed', () => {
		mainWebContents.send(IPC.WINDOWS.ON_CLOSE_SETTINGS)
	})

	settingsWindow.on('show', () => {
		mainWebContents.send(IPC.WINDOWS.ON_OPEN_SETTINGS)
	})
})
