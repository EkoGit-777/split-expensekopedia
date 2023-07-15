import currency from 'currency.js'

const symbol = ''

export const idr = (value:currency) => currency(value, {
  separator: '.',
  decimal: ',',
  precision: 0,
  symbol,
})

export const usd = (value:currency) => currency(value, {
  separator: '.',
  decimal: ',',
  precision: 2,
  symbol,
})

export const jpy = (value:currency) => currency(value, {
  separator: ',',
  decimal: '.',
  precision: 0,
  symbol,
})