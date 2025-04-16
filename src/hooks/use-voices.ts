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
  }, [])

  // If a voice name is provided, return the specific voice
  if (voiceName) {
    return voices.find(voice => voice.name === voiceName)
  }

  // Otherwise return all voices
  return voices
}
