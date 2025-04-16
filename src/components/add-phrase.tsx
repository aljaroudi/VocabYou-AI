import type { Phrase } from '~/lib/types'
import { api } from '~/trpc/react'
import { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Settings } from './settings'
import { useLocalState } from '~/hooks/useLocalState'
import { PlusIcon } from 'lucide-react'

export function AddPhrase({ onAdd }: { onAdd: (def: Phrase) => void }) {
  const [phrase, setPhrase] = useState('')
  const [apiKey, setApiKey] = useLocalState('apiKey', '')
  const [languages, setLanguages] = useLocalState('languages', ['en-US', 'es-ES'])
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
      className="flex gap-2"
      onSubmit={e => {
        e.preventDefault()
        add.mutate({ phrase, apiKey, languages })
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
        className="rounded-full bg-white"
        minLength={1}
        required
        disabled={add.isPending}
      />
      <Button
        disabled={!phrase || !apiKey || add.isPending}
        size="icon"
        type="submit"
        aria-busy={add.isPending}
        className="rounded-full aria-busy:animate-spin"
      >
        <PlusIcon />
      </Button>
    </form>
  )
}
