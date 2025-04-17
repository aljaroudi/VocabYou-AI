import type { Phrase } from '~/lib/types'
import { api } from '~/trpc/react'
import { useState } from 'react'
import { Input } from './ui/input'
import { Settings } from './settings'
import { useLocalState } from '~/hooks/useLocalState'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { LANGS } from '~/lib/constants'
import { languageLabels } from '~/lib/i18n-helpers'

export function AddPhrase({ onAdd }: { onAdd: (def: Phrase) => void }) {
	const [phrase, setPhrase] = useState('')
	const [apiKey, setApiKey] = useLocalState('apiKey', '')
	const [languages, setLanguages] = useLocalState('languages', ['en-US', 'es-ES'])
	const [lang, setLang] = useState('auto detect')

	const add = api.ai.define.useMutation({
		onSuccess: data => {
			onAdd(data)
			setPhrase('')
		},
	})

	function handleLangChange(lang: string) {
		setLanguages(prev => (prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]))
	}

	return (
		<form
			className="sticky top-0 flex gap-2 backdrop-blur-md rounded-full p-2"
			onSubmit={e => {
				e.preventDefault()
				add.mutate({ phrase, apiKey, languages, lang })
				e.currentTarget.blur()
			}}
		>
			<Settings
				apiKey={apiKey}
				setApiKey={setApiKey}
				languages={languages}
				setLanguages={handleLangChange}
			/>
			<Input
				value={phrase}
				onChange={e => setPhrase(e.target.value)}
				placeholder="Enter a phrase..."
				className="rounded-full bg-white disabled:animate-pulse"
				minLength={1}
				required
				disabled={add.isPending}
			/>
			<Select value={lang} onValueChange={setLang}>
				<SelectTrigger
					className="rounded-full bg-white disabled:animate-pulse"
					disabled={add.isPending}
				>
					<SelectValue placeholder="Select a language">
						{lang === 'auto detect'
							? 'Auto'
							: languageLabels[lang as keyof typeof languageLabels].flag}
					</SelectValue>
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="auto detect">
						<span role="img" aria-label="Auto detect">
							🧠 Auto
						</span>
					</SelectItem>
					{LANGS.map(lang => (
						<SelectItem key={lang} value={lang}>
							{languageLabels[lang].flag} {languageLabels[lang].name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</form>
	)
}
