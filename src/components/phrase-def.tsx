import type { Phrase } from '~/lib/types'
import { Button } from './ui/button'
import { ArrowUpIcon, HeadphonesIcon, TrashIcon } from 'lucide-react'
import { languageLabels } from '~/lib/i18n-helpers'
import { getTimeAgo } from '~/lib/dates'
import { useVoices } from '~/hooks/use-voices'
import { useState } from 'react'

export function PhraseDef({
  def: { def, phrase, timestamp },
  onDelete,
  onMoveUp,
}: {
  def: Phrase
  onDelete: VoidFunction
  onMoveUp: VoidFunction
}) {
  const voices = useVoices()
  const [isSpeaking, setIsSpeaking] = useState<number>()
  const langName = def.originalText.lang ? languageLabels[def.originalText.lang].name : ''
  return (
    <div>
      <div
        className="flex justify-between data-[rtl=true]:flex-row-reverse"
        data-rtl={def.originalText.lang === 'ar-001'}
      >
        <h2 className="text-lg font-bold">
          {phrase} <i className="text-sm text-gray-500">{langName}</i>
        </h2>
        <p className="text-sm text-gray-500">{getTimeAgo(timestamp)}</p>
      </div>
      <div className="flex flex-col gap-2">
        {def.translations.map((t, i) => {
          const labels = languageLabels[t.target]
          const isRtl = t.target === 'ar-001'

          function speak() {
            const utterance = new SpeechSynthesisUtterance(t.text)
            if (t.target !== 'en-US') {
              utterance.voice =
                voices.find(v => v.lang === t.target && v.localService) ??
                voices.find(v => v.lang === t.target) ??
                null
            }

            utterance.lang = t.target
            utterance.onstart = () => setIsSpeaking(i)
            utterance.onend = () => setIsSpeaking(undefined)
            window.speechSynthesis.speak(utterance)
          }
          return (
            <div
              key={i}
              className="flex flex-col gap-2 rounded-md border p-2 shadow"
              data-lang={t.target}
            >
              <div
                className="flex items-center gap-2 data-[rtl=true]:flex-row-reverse"
                data-rtl={isRtl}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full disabled:animate-spin"
                  onClick={speak}
                  disabled={isSpeaking === i}
                >
                  <HeadphonesIcon />
                </Button>
                <span className="font-bold data-[rtl=true]:text-right" data-rtl={isRtl}>
                  {labels.flag} {t.text}
                </span>
              </div>
              <p
                className="cursor-copy text-sm data-[rtl=true]:text-right"
                data-rtl={isRtl}
                onClick={() => navigator.clipboard.writeText(t.definition)}
              >
                {t.definition}
              </p>
              <TitledList title={labels.exampleLabel} items={t.examples} rtl={isRtl} />
              <TitledList title={labels.synonymLabel} items={t.synonyms} rtl={isRtl} />
              <TitledList title={labels.antonymLabel} items={t.antonyms} rtl={isRtl} />
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
}: {
  title: string
  items?: string[] | null
  rtl: boolean
}) {
  if (!items?.length) return null
  return (
    <div
      className="flex flex-col gap-2 rounded bg-white p-2 data-[rtl=true]:text-right"
      data-rtl={rtl}
    >
      <p className="text-sm font-bold">{title}</p>
      <ol className="flex flex-col gap-2 p-2 text-sm">
        {items?.map(i => (
          <li key={i} className="rounded bg-stone-100 px-2 py-1">
            {i}
          </li>
        ))}
      </ol>
    </div>
  )
}
