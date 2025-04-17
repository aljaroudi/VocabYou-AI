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
	const langName = def.originalText.lang ? languageLabels[def.originalText.lang].name : ''
	return (
		<div>
			<div
				className="flex justify-between data-[rtl=true]:flex-row-reverse"
				data-rtl={def.originalText.lang === 'ar-001'}
			>
				<h2 className="text-lg font-bold">
					{phrase} <i className="text-xs text-gray-500">{langName}</i>
				</h2>
			</div>
			<div className="flex flex-col gap-2">
				{def.translations.map((t, i) => {
					const labels = languageLabels[t.target]
					const isRtl = t.target === 'ar-001'
					return (
						<div key={i} className="flex flex-col gap-2 rounded-md border p-2 shadow">
							<div
								className="flex items-center gap-2 data-[rtl=true]:flex-row-reverse"
								data-rtl={isRtl}
							>
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
								<div
									className="flex flex-col items-start w-full data-[rtl=true]:items-end"
									data-rtl={isRtl}
								>
									<div
										className="flex data-[rtl=true]:flex-row-reverse items-center gap-1"
										data-rtl={isRtl}
									>
										<span role="img">{labels.flag}</span>
										<span className="font-bold data-[rtl=true]:text-right">{t.text}</span>
									</div>
									<span className="text-xs text-gray-500">{t.pronunciation}</span>
								</div>
							</div>
							<p
								className="cursor-copy text-sm data-[rtl=true]:text-right"
								data-rtl={isRtl}
								onClick={() => navigator.clipboard.writeText(t.definition)}
							>
								{t.definition}
							</p>
							<TitledList
								title={labels.exampleLabel}
								items={t.examples}
								rtl={isRtl}
								lang={t.target}
							/>
							<TitledList
								title={labels.synonymLabel}
								items={t.synonyms}
								rtl={isRtl}
								lang={t.target}
							/>
							<TitledList
								title={labels.antonymLabel}
								items={t.antonyms}
								rtl={isRtl}
								lang={t.target}
							/>
						</div>
					)
				})}
			</div>
			<div className="flex justify-between">
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
	rtl,
	lang,
}: {
	title: string
	items?: string[] | null
	rtl: boolean
	lang: Lang
}) {
	if (!items?.length) return null
	return (
		<div
			className="flex flex-col gap-2 rounded bg-white p-2 data-[rtl=true]:text-right"
			data-rtl={rtl}
		>
			<p className="text-sm font-bold">{title}</p>
			<ol className="flex flex-col gap-2 p-2 text-sm">
				{items?.map((text, i) => (
					<li
						key={i}
						className="rounded bg-stone-100 px-2 py-1 cursor-pointer"
						onClick={() => speak({ text, lang })}
					>
						<HeadphonesIcon className="size-3 inline" />
						&nbsp;{text}
					</li>
				))}
			</ol>
		</div>
	)
}
