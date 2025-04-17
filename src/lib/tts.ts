import { getVoices } from '~/hooks/use-voices'

export async function speak({
	text,
	lang,
	onStart = null,
	onEnd = null,
}: {
	text: string
	lang: string
	onStart: VoidFunction | null
	onEnd: VoidFunction | null
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
