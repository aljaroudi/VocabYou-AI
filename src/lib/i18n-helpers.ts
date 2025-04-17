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
  'ar-001': {
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
    name: 'Deutsch',
    synonymLabel: 'Synonyme',
    antonymLabel: 'Antonyme',
    exampleLabel: 'Beispiele',
  },
  'ja-JP': {
    flag: '🇯🇵',
    name: '日本語',
    synonymLabel: '同義語',
    antonymLabel: '反義語',
    exampleLabel: '例文',
  },
  'zh-CN': {
    flag: '🇨🇳',
    name: '中文',
    synonymLabel: '同义词',
    antonymLabel: '反义词',
    exampleLabel: '例子',
  },
  'hi-IN': {
    flag: '🇮🇳',
    name: 'हिंदी',
    synonymLabel: 'समानार्थी',
    antonymLabel: 'विपरीतार्थी',
    exampleLabel: 'उदाहरण',
  },
  'ru-RU': {
    flag: '🇷🇺',
    name: 'Русский',
    synonymLabel: 'Синонимы',
    antonymLabel: 'Антонимы',
    exampleLabel: 'Примеры',
  },
  'bn-BD': {
    flag: '🇧🇩',
    name: 'বাংলা',
    synonymLabel: 'সমার্থক শব্দ',
    antonymLabel: 'বিপরীত শব্দ',
    exampleLabel: 'উদাহরণ',
  },
  'id-ID': {
    flag: '🇮🇩',
    name: 'Bahasa Indonesia',
    synonymLabel: 'Sinonim',
    antonymLabel: 'Antonim',
    exampleLabel: 'Contoh',
  },
  'it-IT': {
    flag: '🇮🇹',
    name: 'Italiano',
    synonymLabel: 'Sinonimi',
    antonymLabel: 'Contrari',
    exampleLabel: 'Esempi',
  },
  'ko-KR': {
    flag: '🇰🇷',
    name: '한국어',
    synonymLabel: '동의어',
    antonymLabel: '반의어',
    exampleLabel: '예시',
  },
  'pt-BR': {
    flag: '🇧🇷',
    name: 'Português (Brasil)',
    synonymLabel: 'Sinônimos',
    antonymLabel: 'Antônimos',
    exampleLabel: 'Exemplos',
  },
  'zh-TW': {
    flag: '🇹🇼',
    name: '中文 (繁體)',
    synonymLabel: '同義詞',
    antonymLabel: '反義詞',
    exampleLabel: '例子',
  },
}
