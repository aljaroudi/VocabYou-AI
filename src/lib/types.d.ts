import type { RouterOutputs } from '~/trpc/react'

export type Phrase = RouterOutputs['ai']['define']
export type Lang = Phrase['def']['translations'][number]['target']
