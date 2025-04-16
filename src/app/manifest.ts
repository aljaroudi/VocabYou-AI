import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'VocabYou',
    short_name: 'VocabYou',
    description: 'AI-powered tool for learning vocabulary in multiple languages.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
  }
}
