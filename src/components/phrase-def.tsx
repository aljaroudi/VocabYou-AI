import type { Phrase } from '~/lib/types'
import { Button } from './ui/button'
import { ArrowUpIcon, TrashIcon } from 'lucide-react'
import { languageLabels } from '~/lib/i18n-helpers'
import { getTimeAgo } from '~/lib/dates'

export function PhraseDef({
  def: { def, phrase, timestamp },
  onDelete,
  onMoveUp,
}: {
  def: Phrase
  onDelete: VoidFunction
  onMoveUp: VoidFunction
}) {
  return (
    <div>
      <div
        className="flex justify-between data-[lang=ar-SA]:flex-row-reverse"
        data-lang={def.detectedLang}
      >
        <h2 className="text-lg font-bold">
          {phrase} <i className="text-sm text-gray-500">({def.detectedLang})</i>
        </h2>
        <p className="text-sm text-gray-500">{getTimeAgo(timestamp)}</p>
      </div>
      <div className="flex flex-col gap-2">
        {def.translations.map(t => {
          const labels = languageLabels[t.target]
          const isRtl = t.target === 'ar-SA'
          return (
            <div
              key={t.target}
              className="flex flex-col gap-2 rounded-md border p-2 shadow"
              data-lang={t.target}
            >
              <span className="font-bold data-[rtl=true]:text-right" data-rtl={isRtl}>
                {labels.flag} {t.text}
              </span>
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

function TitledList({ title, items, rtl }: { title: string; items?: string[]; rtl: boolean }) {
  if (!items) return null
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
