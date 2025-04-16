import '~/styles/globals.css'

import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

import { TRPCReactProvider } from '~/trpc/react'

export const metadata: Metadata = {
  title: 'VocabYou',
  description: 'VocabYou is a tool for learning vocabulary in multiple languages.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Analytics />
      </body>
    </html>
  )
}
