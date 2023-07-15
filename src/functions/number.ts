export function useNumberFormatter () {
  const number = (num: number) => {
    if (num && !isNaN(num)) {
      return new Intl.NumberFormat('id-ID').format(num)
    }

    return '0'
  }

  const price = (num: number) => {
    if (num !== null && !isNaN(num)) {
      return new Intl.NumberFormat('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num)
    }

    return 'Belum ada harga'
  }

  const decimal = (num: number) => {
    if (num && !isNaN(num)) {
      return new Intl.NumberFormat('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(num)
    }

    return '0'
  }

  const numberAbbreviate = (num: number) => {
    return num
  }

  return {
    number,
    price,
    decimal,
    numberAbbreviate,
  }
}