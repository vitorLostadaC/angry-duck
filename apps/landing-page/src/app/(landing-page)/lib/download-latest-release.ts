import type { GithubRelease } from '@/types/github-release'
import type { AppVersion } from '../constants/version'

export async function downloadLatestRelease(version: AppVersion) {
	const url = 'https://api.github.com/repos/vitorLostadaC/angry-duck/releases/latest'
	const res = await fetch(url)
	if (!res.ok) {
		throw new Error(`GitHub API error: ${res.status} ${res.statusText}`)
	}
	const release = (await res.json()) as GithubRelease

	const downloadUrl = release.assets.find((a) => a.name.endsWith(version))?.browser_download_url

	if (!downloadUrl) {
		throw new Error('No download URL found')
	}

	window.open(downloadUrl, '_blank')
}
