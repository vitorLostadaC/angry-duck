import type { GithubRelease } from '../types/github'

export async function getLatestVersion() {
	const url = 'https://api.github.com/repos/vitorLostadaC/angry-duck/releases/latest'
	const res = await fetch(url)
	if (!res.ok) {
		return null
	}
	const release = (await res.json()) as GithubRelease

	const publishedAt = new Date(release.published_at)
	const now = new Date()
	const diffMs = now.getTime() - publishedAt.getTime()
	const diffMinutes = diffMs / (1000 * 60)

	if (diffMinutes < 15) {
		return null
	}

	return release.tag_name.replace('v', '')
}
