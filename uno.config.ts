// @unocss-include
import transformerDirectives from '@unocss/transformer-directives'
import { defineConfig } from 'unocss'
import presetIcons from 'unocss/preset-icons'
import presetUno from 'unocss/preset-uno'


export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      cdn: 'https://esm.sh/',
      customizations: {
        transform(svg, collection) {
          const fontAwesomeCollection = ['fab', 'far', 'fas', 'fat', 'fal', 'fad', 'fasr', 'fass']
          if (fontAwesomeCollection.includes(collection)) {
            return svg.replace('<path', '<path fill="currentColor"')
          }
          return svg
        },
      },
    }),
  ],
  transformers: [
    transformerDirectives(), // enable @apply for css
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
      },
    },
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1920px',
    },
    colors: {
    },
  },
  rules: [
    ['un-cloak', { display: 'block' }],
    ['text-2xs', { 'font-size': '.6875rem' }], // 11px
    ['text-3xs', { 'font-size': '.625rem' }], // 10px
    ['text-4xs', { 'font-size': '.5625rem' }], // 9px
    ['text-5xs', { 'font-size': '.5rem' }], // 8px
  ],
  shortcuts: [
    {
    },
  ],
})
