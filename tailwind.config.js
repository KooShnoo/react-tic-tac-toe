const plugin = require('tailwindcss/plugin')
/*from tailwindcss/lib/util/flattenColorPalette */
const flattenColorPalette = (colors) =>
Object.assign(
  {},
  ...Object.entries(colors ?? {}).flatMap(([color, values]) =>
    typeof values == 'object'
      ? Object.entries(flattenColorPalette(values)).map(([number, hex]) => ({
          [color + (number === 'DEFAULT' ? '' : `-${number}`)]: hex,
        }))
      : [{ [`${color}`]: values }]
  )
)

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textStrokeWidth: {
        'none': '0px',
        'xs': '.25px',
        'sm': '.5px',
        'md': '.75px',
        'lg': '1px',
        'xl': '2px',
        '2xl': '3px'
      }
    },
  },
  plugins: [
    plugin(function({matchUtilities, theme}) {
      matchUtilities(
        {
        'text-stroke': (value) => ({
          '-webkit-text-stroke-width': value
        })
        },
        {
          values: theme('textStrokeWidth'),
          type: ['length', 'any']
        })
  }),
  plugin(function({matchUtilities, theme}) {
    matchUtilities(
      {
      'text-stroke': (value) => ({
        '-webkit-text-stroke-color': value
      })
      },
      {
        values: flattenColorPalette(theme('colors')),
        type: ['color', 'any'],
      })
}),
],
}
