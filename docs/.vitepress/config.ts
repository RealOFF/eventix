import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Eventix',
  description: 'Type-safe event routing library for TypeScript',
  base: '/eventix/',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/' },
      { text: 'Examples', link: '/examples/' },
      { text: 'GitHub', link: 'https://github.com/RealOFF/eventix' }
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Why Eventix?', link: '/guide/why' }
        ]
      },
      {
        text: 'Core Concepts',
        items: [
          { text: 'Event Router', link: '/guide/event-router' },
          { text: 'Validation', link: '/guide/validation' },
          { text: 'Type Safety', link: '/guide/type-safety' }
        ]
      },
      {
        text: 'Advanced',
        items: [
          { text: 'Router Composition', link: '/guide/composition' },
        ]
      }
    ]
  }
})