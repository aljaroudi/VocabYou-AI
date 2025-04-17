'use client'
import { useEffect, useState } from 'react'

export function useVoices(): SpeechSynthesisVoice[]
export function useVoices(voiceName: string): SpeechSynthesisVoice | undefined
export function useVoices(
	voiceName?: string
): SpeechSynthesisVoice[] | SpeechSynthesisVoice | undefined {
	const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

	useEffect(() => {
		function updateVoices() {
			const availableVoices = window.speechSynthesis.getVoices()
			setVoices(availableVoices)
		}

		// Some browsers load voices asynchronously
		if (window.speechSynthesis.onvoiceschanged !== undefined) {
			window.speechSynthesis.onvoiceschanged = updateVoices
		}

		updateVoices()

		// Cleanup function to remove the event handler when component unmounts
		return () => {
			if (window.speechSynthesis.onvoiceschanged !== undefined) {
				window.speechSynthesis.onvoiceschanged = null
			}
		}
	}, [])

	// If a voice name is provided, return the specific voice
	if (voiceName) {
		return voices.find(voice => voice.name === voiceName)
	}

	// Otherwise return all voices
	return voices
}

export async function getVoices(): Promise<SpeechSynthesisVoice[]> {
	// Get initial voices
	let availableVoices = window.speechSynthesis.getVoices()

	// If no voices are returned, we need to wait for the onvoiceschanged event
	if (availableVoices.length === 0 && window.speechSynthesis.onvoiceschanged !== undefined) {
		availableVoices = await new Promise<SpeechSynthesisVoice[]>(resolve => {
			window.speechSynthesis.onvoiceschanged = () => {
				const voices = window.speechSynthesis.getVoices()
				window.speechSynthesis.onvoiceschanged = null
				resolve(voices)
			}
		})
	}

	return availableVoices
}
