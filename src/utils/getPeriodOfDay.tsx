import { endOfHour, isAfter, isBefore, isEqual } from 'date-fns'

type GetPeriodOfDay = 'noite' | 'tarde' | 'dia'

export function getPeriodOfDay(date: Date): GetPeriodOfDay {
  const morningStartsAt = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    6,
  )

  const morningEndsAt = endOfHour(
    new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12),
  )

  const eveningStartsAt = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    12,
  )

  const eveningEndsAt = endOfHour(
    new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18),
  )

  const nightStartsAt = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    19,
  )

  const nightEndsAt = endOfHour(
    new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23),
  )

  const dawnStartsAt = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0,
  )

  const dawnEndsAt = endOfHour(
    new Date(date.getFullYear(), date.getMonth(), date.getDate(), 5),
  )

  if (
    (isEqual(date, morningStartsAt) || isAfter(date, morningStartsAt)) &&
    (isEqual(date, morningEndsAt) || isBefore(date, morningEndsAt))
  ) {
    return 'dia'
  }

  if (
    (isEqual(date, eveningStartsAt) || isAfter(date, eveningStartsAt)) &&
    (isEqual(date, eveningEndsAt) || isBefore(date, eveningEndsAt))
  ) {
    return 'tarde'
  }

  if (
    (isEqual(date, nightStartsAt) || isAfter(date, nightStartsAt)) &&
    (isEqual(date, nightEndsAt) || isBefore(date, nightEndsAt))
  ) {
    return 'noite'
  }

  if (
    (isEqual(date, dawnStartsAt) || isAfter(date, dawnStartsAt)) &&
    (isEqual(date, dawnEndsAt) || isBefore(date, dawnEndsAt))
  ) {
    return 'noite'
  }

  return 'dia'
}
