import { type GenerateContentConfig, Type as Schema } from '@google/genai/node'
import * as z from 'zod'
import { LANGS, PARTS_OF_SPEECH } from '~/lib/constants'

export const geminiConfig = {
  temperature: 0,
  responseMimeType: 'application/json',
  systemInstruction: {
    text: 'You are an AI assistant that translates phrases and provides clear definitions, part of speech, synonyms, antonyms, and usage examples. Include multiple translations for the same language if useful.',
  },
  responseSchema: {
    type: Schema.OBJECT,
    properties: {
      detectedLang: {
        type: Schema.STRING,
        enum: LANGS,
        description: 'detected language of the input phrase',
        nullable: false,
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
              description: 'the translation of the input phrase',
            },
            definition: {
              type: Schema.STRING,
              description: 'definition or meaning of the translated word or phrase',
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
      definition: z.optional(z.string()),
      func: z.optional(z.enum(PARTS_OF_SPEECH)),
      synonyms: z.optional(z.array(z.string())),
      antonyms: z.optional(z.array(z.string())),
      examples: z.optional(z.array(z.string())),
    })
  ),
})

export type GeminiRes = z.infer<typeof GeminiRes>
