export const LANGS = [
  'ar-001', // Modern Standard Arabic
  'bn-BD', // Bengali (Bangladesh)
  'de-DE', // German (Germany)
  'en-GB', // English (United Kingdom)
  'en-US', // English (United States)
  'es-ES', // Spanish (Spain)
  'es-MX', // Spanish (Mexico)
  'fr-FR', // French (France)
  'hi-IN', // Hindi (India)
  'id-ID', // Indonesian (Indonesia)
  'it-IT', // Italian (Italy)
  'ja-JP', // Japanese (Japan)
  'ko-KR', // Korean (South Korea)
  'pt-BR', // Portuguese (Brazil)
  'ru-RU', // Russian (Russia)
  'zh-CN', // Chinese (Simplified, Mainland China)
  'zh-TW', // Chinese (Traditional, Taiwan)
] as const satisfies string[]

export const PARTS_OF_SPEECH = [
  'noun',
  'verb',
  'adjective',
  'adverb',
  'pronoun',
  'preposition',
  'conjunction',
  'interjection',
  'determiner',
  'article',
] as const satisfies string[]
