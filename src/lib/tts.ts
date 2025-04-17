import { getVoices } from '~/hooks/use-voices'
import type { Lang } from './types'

export async function speak({
	text,
	lang,
	onStart = null,
	onEnd = null,
}: {
	text: string
	lang: Lang
	onStart?: VoidFunction | null
	onEnd?: VoidFunction | null
}) {
	const voices = await getVoices()
	const utterance = new SpeechSynthesisUtterance(text)
	if (lang !== 'en-US') {
		utterance.voice =
			voices.find(v => v.lang === lang && v.localService) ??
			voices.find(v => v.lang === lang) ??
			null
	}

	utterance.lang = lang
	utterance.onstart = onStart
	utterance.onend = onEnd
	window.speechSynthesis.speak(utterance)
}
