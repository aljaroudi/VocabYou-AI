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
  const add = api.ai.define.useMutation({
    onSuccess: data => {
      onAdd(data)
      setPhrase('')
    },
  })

  return (
    <div className="flex gap-2">
      <Settings apiKey={apiKey} setApiKey={setApiKey} />
      <Input
        value={phrase}
        onChange={e => setPhrase(e.target.value)}
        placeholder="Enter a phrase..."
        className="rounded-full bg-white"
      />
      <Button
        disabled={!phrase || !apiKey || add.isPending}
        size="icon"
        onClick={() => add.mutate({ phrase, apiKey, languages: ['en-US', 'es-ES'] })}
        aria-busy={add.isPending}
        className="rounded-full aria-busy:animate-spin"
      >
        <PlusIcon />
      </Button>
    </div>
  )
}
