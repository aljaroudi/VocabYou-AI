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
      detectedLang: {
        type: Schema.STRING,
        enum: LANGS,
        description:
          'The ISO language code of the automatically detected source language (e.g., "en-US", "fr-FR")',
        nullable: false,
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
      definition: z.string(),
      func: z.optional(z.enum(PARTS_OF_SPEECH)),
      synonyms: z.union([z.array(z.string()), z.null()]).optional(),
      antonyms: z.union([z.array(z.string()), z.null()]).optional(),
      examples: z.union([z.array(z.string()), z.null()]).optional(),
    })
  ),
})

export type GeminiRes = z.infer<typeof GeminiRes>
