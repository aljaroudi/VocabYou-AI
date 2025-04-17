import { type GenerateContentConfig, Type as Schema } from '@google/genai/node'
import * as z from 'zod'
import { LANGS, PARTS_OF_SPEECH } from '~/lib/constants'

export const geminiConfig = {
  temperature: 0,
  responseMimeType: 'application/json',
  systemInstruction: {
    text: 'You are an AI assistant that translates phrases and provides clear definitions, part of speech, synonyms, antonyms, and usage examples. For each target language, provide multiple translations when possible, especially for words with different meanings or contexts. Always include a clear definition for each translation. Make the definitions comprehensive and easy to understand.',
  },
  responseSchema: {
    type: Schema.OBJECT,
    properties: {
      originalText: {
        type: Schema.OBJECT,
        properties: {
          lang: {
            type: Schema.STRING,
            description: 'The most likely ISO language code of the phrase (e.g., "en-US", "fr-FR")',
            nullable: false,
          },
          pronunciation: {
            type: Schema.STRING,
            description: 'IPA pronunciation of the original input phrase',
            nullable: true,
          },
        },
      },
      translations: {
        type: Schema.ARRAY,
        description:
          'List of translations in different target languages. Provide multiple translations per language when possible.',
        items: {
          type: Schema.OBJECT,
          required: ['target', 'text', 'definition'],
          properties: {
            target: {
              type: Schema.STRING,
              enum: LANGS,
            },
            text: {
              type: Schema.STRING,
              description: 'the translation of the input phrase',
            },
            definition: {
              type: Schema.STRING,
              description:
                'a clear and comprehensive yet concise definition or meaning of the translated word or phrase in the target language',
              nullable: false,
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
            pronunciation: {
              type: Schema.STRING,
              description: 'IPA pronunciation of the translated word or phrase',
              nullable: true,
            },
          },
        },
      },
    },
  },
} satisfies GenerateContentConfig

export const GeminiRes = z.object({
  originalText: z.object({
    lang: z.string(),
    pronunciation: z.optional(z.nullable(z.string())),
  }),
  translations: z.array(
    z.object({
      target: z.enum(LANGS),
      text: z.string(),
      definition: z.string(),
      func: z.optional(z.enum(PARTS_OF_SPEECH)),
      synonyms: z.optional(z.nullable(z.array(z.string()))),
      antonyms: z.optional(z.nullable(z.array(z.string()))),
      examples: z.optional(z.nullable(z.array(z.string()))),
      pronunciation: z.optional(z.nullable(z.string())),
    })
  ),
})

export type GeminiRes = z.infer<typeof GeminiRes>
