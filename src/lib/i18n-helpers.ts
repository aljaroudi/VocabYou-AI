import type { Phrase } from './types'

type Label = {
  flag: string
  name: string
  synonymLabel: string
  antonymLabel: string
  exampleLabel: string
}

export const languageLabels: Record<Phrase['def']['detectedLang'], Label> = {
  'en-US': {
    flag: '🇺🇸',
    name: 'English (US)',
    synonymLabel: 'Synonyms',
    antonymLabel: 'Antonyms',
    exampleLabel: 'Examples',
  },
  'en-GB': {
    flag: '🇬🇧',
    name: 'English (GB)',
    synonymLabel: 'Synonyms',
    antonymLabel: 'Antonyms',
    exampleLabel: 'Examples',
  },
  'es-ES': {
    flag: '🇪🇸',
    name: 'Español (España)',
    synonymLabel: 'Sinónimos',
    antonymLabel: 'Antónimos',
    exampleLabel: 'Ejemplos',
  },
  'es-MX': {
    flag: '🇲🇽',
    name: 'Español (México)',
    synonymLabel: 'Sinónimos',
    antonymLabel: 'Antónimos',
    exampleLabel: 'Ejemplos',
  },
  'ar-SA': {
    flag: '🇸🇦',
    name: 'العربية',
    synonymLabel: 'مترادفات',
    antonymLabel: 'مضافات',
    exampleLabel: 'أمثلة',
  },
  'fr-FR': {
    flag: '🇫🇷',
    name: 'Français (France)',
    synonymLabel: 'Synonymes',
    antonymLabel: 'Antonymes',
    exampleLabel: 'Exemples',
  },
  'de-DE': {
    flag: '🇩🇪',
    name: 'Deutsch (Deutschland)',
    synonymLabel: 'Synonyme',
    antonymLabel: 'Antonyme',
    exampleLabel: 'Beispiele',
  },
  'ja-JP': {
    flag: '🇯🇵',
    name: '日本語 (日本)',
    synonymLabel: '同義語',
    antonymLabel: '反義語',
    exampleLabel: '例文',
  },
  'zh-CN': {
    flag: '🇨🇳',
    name: '中文 (中国)',
    synonymLabel: '同义词',
    antonymLabel: '反义词',
    exampleLabel: '例子',
  },
  'hi-IN': {
    flag: '🇮🇳',
    name: 'हिंदी (भारत)',
    synonymLabel: 'समानार्थी',
    antonymLabel: 'विपरीतार्थी',
    exampleLabel: 'उदाहरण',
  },
  'ru-RU': {
    flag: '🇷🇺',
    name: 'Русский (Россия)',
    synonymLabel: 'Синонимы',
    antonymLabel: 'Антонимы',
    exampleLabel: 'Примеры',
  },
}
