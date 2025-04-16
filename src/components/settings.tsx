import { KeyRoundIcon } from 'lucide-react'
import { Button } from './ui/button'

export function Settings({
  apiKey,
  setApiKey,
}: {
  apiKey: string
  setApiKey: (key: string) => void
}) {
  return (
    <Button
      onClick={() => {
        const key = prompt('Enter your API key', apiKey)?.trim()
        if (key) setApiKey(key)
      }}
      size="icon"
      variant={apiKey ? 'outline' : 'destructive'}
      aria-invalid={!apiKey}
      className="aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive rounded-full aria-invalid:animate-pulse"
    >
      <KeyRoundIcon />
    </Button>
  )
}
