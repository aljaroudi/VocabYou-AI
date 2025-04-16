import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'VocabYou',
    short_name: 'VocabYou',
    description: 'AI-powered tool for learning vocabulary in multiple languages.',
    start_url: '/',
    display: 'standalone',
    background_color: 'oklch(97% 0.001 106.424)',
    theme_color: 'oklch(97% 0.001 106.424)',
    icons: [
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
