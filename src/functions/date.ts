import { format, formatDistance, differenceInDays } from 'date-fns'
import { id } from 'date-fns/locale'

export function useDateFormatter() {
  const formatDate = (dt: string | number | Date, fmt: string) => {
    return format(new Date(dt), fmt, { locale: id })
  }

  const formatDifferenceNumber = (from: string | number | Date, to: string | number | Date) => {
    return differenceInDays(new Date(from), new Date(to))
  }

  const formatDifference = (from: string | number | Date, to: string | number | Date) => {
    return formatDistance(new Date(from), new Date(to), { locale: id })
  }

  const formatTodayDifference = (dt: string | number | Date) => {
    return formatDistance(new Date(dt), new Date(), { locale: id, addSuffix: true })
  }

  return {
    formatDate,
    formatDifferenceNumber,
    formatDifference,
    formatTodayDifference,
  }
}
