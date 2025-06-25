import type { GithubRelease } from '../types/github'

export async function getLatestVersion() {
	const url = 'https://api.github.com/repos/vitorLostadaC/angry-duck/releases/latest'
	const res = await fetch(url)
	if (!res.ok) {
		throw new Error(`GitHub API error: ${res.status} ${res.statusText}`)
	}
	const release = (await res.json()) as GithubRelease
	return release.tag_name.replace('v', '')
}
