'use client'
import { AddPhrase } from '~/components/add-phrase'
import { PhraseDef } from '~/components/phrase-def'
import { useLocalState } from '~/hooks/useLocalState'
import type { Phrase } from '~/lib/types'

export default function Home() {
	const [phrases, setPhrases] = useLocalState<Phrase[]>('phrases', [])

	return (
		<main className="flex h-dvh flex-col items-center overflow-auto bg-stone-100 p-2">
			<div className="flex w-full max-w-[40ch] flex-col gap-4 pb-8">
				<AddPhrase onAdd={p => setPhrases(prev => [p, ...prev])} />
				{phrases.map((phrase, index) => (
					<PhraseDef
						key={index}
						def={phrase}
						onDelete={() => setPhrases(prev => prev.filter((_, i) => i !== index))}
						onMoveUp={() => setPhrases(prev => [phrase, ...prev.filter((_, i) => i !== index)])}
					/>
				))}
			</div>
		</main>
	)
}
