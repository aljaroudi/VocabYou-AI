import { type GenerateContentConfig, Type as Schema } from '@google/genai/node'
import * as z from 'zod'
import { LANGS, PARTS_OF_SPEECH } from '~/lib/constants'

export const geminiConfig = {
  temperature: 0.1,
  responseMimeType: 'application/json',
  systemInstruction: {
    text: 'You are an AI assistant that translates input phrases and provides detailed definitions, part of speech, synonyms, antonyms, IPA pronunciations, and usage examples. CRITICAL: ALL content (definitions, examples, synonyms, antonyms) MUST be written in the target language - NEVER in English or any other language. Always return definitions and other properties even if the target language matches the input. Include multiple translations per language where appropriate. Antonyms must be returned when relevant. If you cannot provide content in the target language, omit that field rather than providing it in English.',
  },
  responseSchema: {
    type: Schema.OBJECT,
    properties: {
      originalText: {
        type: Schema.OBJECT,
        properties: {
          lang: {
            type: Schema.STRING,
            description: 'The most likely ISO language code of the original phrase',
            enum: LANGS,
            nullable: true,
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

// Translations array includes one or more translations with metadata. Always include definition, pronunciation, examples, synonyms, and antonyms if applicable.
export const GeminiRes = z.object({
  originalText: z.object({
    lang: z.optional(z.nullable(z.enum(LANGS))),
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
