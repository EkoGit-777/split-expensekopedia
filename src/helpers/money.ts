import currency from 'currency.js'

const symbol = ''

export const idr = value => currency(value, {
  separator: '.',
  decimal: ',',
  precision: 0,
  symbol,
})

export const usd = value => currency(value, {
  separator: '.',
  decimal: ',',
  precision: 2,
  symbol,
})

export const jpy = value => currency(value, {
  separator: ',',
  decimal: '.',
  precision: 0,
  symbol,
})