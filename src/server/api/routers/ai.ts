import * as z from 'zod'

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { geminiConfig, GeminiRes } from '~/server/schema'
import { GoogleGenAI } from '@google/genai/node'

export const aiRouter = createTRPCRouter({
	define: publicProcedure
		.input(
			z.object({
				phrase: z.string(),
				languages: z.array(z.string()),
				apiKey: z.string(),
				lang: z.string(),
			})
		)
		.output(
			z.object({
				phrase: z.string(),
				timestamp: z.number(),
				def: GeminiRes,
			})
		)
		.mutation(async ({ input: { phrase, languages, apiKey, lang } }) => {
			const timestamp = new Date().getTime()
			const ai = new GoogleGenAI({ apiKey })

			const res = await ai.models.generateContent({
				model: 'gemini-2.0-flash-lite',
				config: geminiConfig,
				contents: [
					{
						role: 'user',
						parts: [
							{
								text: `Phrase: chips\nLanguage: auto detect\nTarget languages: [en-US, en-GB, ar-001, es-ES, es-MX]\n`,
							},
						],
					},
					{
						role: 'model',
						parts: [
							{
								text: `
                {
                  "originalText": { 
                    "lang": "en-US"
                  },
                  "translations": [
                    {
                      "definition": "رقائق البطاطس",
                      "target": "ar-001",
                      "text": "رقائق",
                      "examples": [
                        "أحب رقائق البطاطس مع الصلصة."
                      ],
                      "func": "noun"
                    },
                    {
                      "definition": "Small, thin pieces of fried potato.",
                      "target": "en-GB",
                      "text": "crisps",
                      "examples": [
                        "I like crisps with dip."
                      ],
                      "func": "noun"
                    },
                    {
                      "definition": "Small, thin pieces of fried potato.",
                      "target": "en-US",
                      "text": "chips",
                      "examples": [
                        "I like chips with dip."
                      ],
                      "func": "noun"
                    },
                    {
                      "definition": "Pequeños trozos de patata fritos y crujientes.",
                      "target": "es-ES",
                      "text": "patatas fritas",
                      "examples": [
                        "Me encantan las patatas fritas con ketchup."
                      ],
                      "func": "noun"
                    },
                    {
                      "definition": "Pequeños trozos de patata fritos y crujientes.",
                      "target": "es-MX",
                      "text": "papas fritas",
                      "examples": [
                        "Me encantan las papas fritas con catsup."
                      ],
                      "func": "noun"
                    }
                  ]
                }
                `,
							},
						],
					},
					{
						role: 'user',
						parts: [
							{
								text: `Phrase: ${phrase}\nLanguage: ${lang}\nTarget languages: [${languages.join(', ')}]\n`,
							},
						],
					},
				],
			})
			if (!res.text) throw new Error('No response from AI')
			const def = JSON.parse(res.text) as GeminiRes
			def.translations.sort((a, b) => a.target.localeCompare(b.target))
			return { phrase, def, timestamp }
		}),
})
