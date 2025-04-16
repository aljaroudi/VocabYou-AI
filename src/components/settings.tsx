import { KeyRoundIcon, SettingsIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer'

export function Settings({
  apiKey,
  setApiKey,
}: {
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
        <Button size="icon" variant={apiKey ? 'outline' : 'destructive'} aria-invalid={!apiKey}>
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
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
