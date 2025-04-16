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
      })
    )
    .output(
      z.object({
        phrase: z.string(),
        timestamp: z.number(),
        def: GeminiRes,
      })
    )
    .mutation(async ({ input: { phrase, languages, apiKey } }) => {
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
                text: `Target languages: [${languages.join(', ')}]\nPhrase: ${phrase}`,
              },
            ],
          },
        ],
      })
      if (!res.text) throw new Error('No response from AI')
      return { phrase, def: JSON.parse(res.text) as GeminiRes, timestamp }
    }),
})
