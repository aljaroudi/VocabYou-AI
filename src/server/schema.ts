import { type GenerateContentConfig, Type as Schema } from '@google/genai/node'
import * as z from 'zod'

const LANGS = [
  'en-US',
  'en-GB',
  'fr-FR',
  'es-ES',
  'es-MX',
  'de-DE',
  'ar-SA',
  'zh-CN',
  'hi-IN',
  'ja-JP',
  'ru-RU',
] as const satisfies string[]

const PARTS_OF_SPEECH = [
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

export const geminiConfig = {
  temperature: 0,
  responseMimeType: 'application/json',
  responseSchema: {
    type: Schema.OBJECT,
    properties: {
      detectedLang: {
        type: Schema.STRING,
        enum: LANGS,
        description: 'detected language of the input phrase',
      },
      translations: {
        type: Schema.ARRAY,
        description: 'List of translations in different target languages',
        items: {
          type: Schema.OBJECT,
          required: ['target', 'text'],
          properties: {
            target: {
              type: Schema.STRING,
              enum: LANGS,
            },
            text: {
              type: Schema.STRING,
              description: 'translated text',
            },
            definition: {
              type: Schema.STRING,
              description: 'definition of the translated word or phrase',
              nullable: true,
            },
            func: {
              type: Schema.STRING,
              description: 'part of speech',
              nullable: true,
              enum: PARTS_OF_SPEECH,
            },
            synonyms: {
              type: Schema.ARRAY,
              description: 'synonyms of the translated text',
              nullable: true,
              items: {
                type: Schema.STRING,
              },
            },
            antonyms: {
              type: Schema.ARRAY,
              description: 'antonyms of the translated text',
              nullable: true,
              items: {
                type: Schema.STRING,
              },
            },
            examples: {
              type: Schema.ARRAY,
              description: 'usage examples of the translated text',
              nullable: true,
              items: {
                type: Schema.STRING,
              },
            },
          },
        },
      },
    },
  },
} satisfies GenerateContentConfig

export const GeminiRes = z.object({
  detectedLang: z.enum(LANGS),
  translations: z.array(
    z.object({
      target: z.enum(LANGS),
      text: z.string(),
      definition: z.nullable(z.string()),
      func: z.nullable(z.enum(PARTS_OF_SPEECH)),
      synonyms: z.nullable(z.array(z.string())),
      antonyms: z.nullable(z.array(z.string())),
      examples: z.nullable(z.array(z.string())),
    })
  ),
})

export type GeminiRes = z.infer<typeof GeminiRes>
