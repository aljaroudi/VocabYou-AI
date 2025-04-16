import { KeyRoundIcon, SettingsIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer'
import { MultiSelect } from './multi-select'
import { LANGS } from '~/lib/constants'

export function Settings({
  languages,
  setLanguages,
  apiKey,
  setApiKey,
}: {
  languages: string[]
  setLanguages: (language: string) => void
  apiKey: string
  setApiKey: (key: string) => void
}) {
  function handleApiKeyChange() {
    const newKey = prompt('Enter your Gemini API key', apiKey)
    if (newKey) setApiKey(newKey.trim())
  }
  return (
    <Drawer open={apiKey.length === 0 ? true : undefined}>
      <DrawerTrigger asChild>
        <Button
          size="icon"
          variant={apiKey ? 'outline' : 'destructive'}
          aria-invalid={!apiKey}
          className="rounded-full"
        >
          <SettingsIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-[40ch]">
          <DrawerHeader>
            <DrawerTitle>Settings</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col p-2">
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={handleApiKeyChange}>
                <KeyRoundIcon />
                {apiKey ? 'Update Gemini API key' : 'Gemini API key is required'}
              </Button>
            </div>
            <MultiSelect
              options={LANGS}
              value={languages}
              onChange={setLanguages}
              placeholder="Select languages"
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
