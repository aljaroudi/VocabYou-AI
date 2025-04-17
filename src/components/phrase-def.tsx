import type { Lang, Phrase } from '~/lib/types'
import { Button } from './ui/button'
import { ArrowUpIcon, HeadphonesIcon, TrashIcon } from 'lucide-react'
import { languageLabels } from '~/lib/i18n-helpers'
import { useState } from 'react'
import { speak } from '~/lib/tts'

export function PhraseDef({
	def: { def, phrase },
	onDelete,
	onMoveUp,
}: {
	def: Phrase
	onDelete: VoidFunction
	onMoveUp: VoidFunction
}) {
	const [isSpeaking, setIsSpeaking] = useState<number>()
	const langName = def.originalText.lang ? languageLabels[def.originalText.lang].flag : ''
	return (
		<div>
			<div className="flex justify-between" lang={def.originalText.lang ?? undefined}>
				<h2 className="text-lg font-bold">
					{phrase} <i className="text-xs text-gray-500">{langName}</i>
				</h2>
			</div>
			<div className="flex flex-col gap-2">
				{def.translations.map((t, i) => {
					const labels = languageLabels[t.target]
					return (
						<div
							key={i}
							className="flex flex-col gap-2 rounded-md border p-2 shadow"
							lang={t.target}
						>
							<div className="flex items-center gap-2">
								<Button
									variant="outline"
									size="icon"
									className="rounded-full disabled:animate-spin"
									onClick={() =>
										speak({
											text: t.text,
											lang: t.target,
											onStart: () => setIsSpeaking(i),
											onEnd: () => setIsSpeaking(undefined),
										})
									}
									disabled={isSpeaking === i}
								>
									<HeadphonesIcon />
								</Button>
								<div className="flex flex-col items-start w-full">
									<div className="flex items-center gap-1">
										<span role="img">{labels.flag}</span>
										<span className="font-bold">{t.text}</span>
									</div>
									<span className="text-xs text-gray-500">{t.pronunciation}</span>
									{t.func && <span className="text-xs text-gray-500">({t.func})</span>}
								</div>
							</div>
							<p
								className="cursor-copy text-sm"
								onClick={() => navigator.clipboard.writeText(t.definition)}
							>
								{t.definition}
							</p>
							<TitledList title={labels.exampleLabel} items={t.examples} lang={t.target} />
							<TitledList title={labels.synonymLabel} items={t.synonyms} lang={t.target} />
							<TitledList title={labels.antonymLabel} items={t.antonyms} lang={t.target} />
						</div>
					)
				})}
			</div>
			<div className="flex justify-between py-1">
				<Button variant="ghost" size="icon" onClick={onDelete}>
					<TrashIcon className="text-rose-600" />
				</Button>
				<Button variant="ghost" size="icon" onClick={onMoveUp}>
					<ArrowUpIcon />
				</Button>
			</div>
		</div>
	)
}

function TitledList({
	title,
	items,
	lang,
}: {
	title: string
	items?: string[] | null
	lang: Lang
}) {
	if (!items?.length) return null
	const [isSpeaking, setIsSpeaking] = useState<number>()
	return (
		<div className="flex flex-col rounded bg-white p-2 gap-1 text-sm">
			<p className="font-bold">{title}</p>
			<div className="contents">
				{items.map((text, i) => (
					<button
						key={i}
						className="rounded bg-stone-100 px-2 py-1 cursor-pointer disabled:bg-emerald-200 disabled:animate-pulse"
						disabled={isSpeaking === i}
						onClick={() =>
							speak({
								text,
								lang,
								onStart: () => setIsSpeaking(i),
								onEnd: () => setIsSpeaking(undefined),
							})
						}
					>
						<HeadphonesIcon className="size-3 inline" />
						&nbsp;{text}
					</button>
				))}
			</div>
		</div>
	)
}
