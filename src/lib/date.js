import moment from 'moment'

export const dateFormats = {
  m3dy: 'MMM D, Y',
  y2md: 'YY-MM-DD',
  y4md: 'YYYY-MM-DD'
}

export const dateTimeFormats = {
  m3dy_hm24: 'MMM D, Y HH:mm',
  m3dy_hm24utc: 'MMM D, Y HH:mm (UTC)',
  y4md_hm24: 'YYYY-MM-DD HH:mm',
  y4md_hm24utc: 'YYYY-MM-DD HH:mm (UTC)'
}

export const timeFormats = {
  hm12: 'h:mm a',
  hm24: 'HH:mm',
  hm24utc: 'HH:mm (UTC)'
}

export function dateRangeFromItem(item) {
  return {
    from: item.beginsAt ? item.beginsAt.format(dateFormats.y4md) : null,
    fromEnabled: !!item.beginsAt,
    fromTime: item.beginsAt ? item.beginsAt.format(timeFormats.hm24) : null,
    to: item.endsBefore ? item.endsBefore.format(dateFormats.y4md) : null,
    toEnabled: !!item.endsBefore,
    toTime: item.endsBefore ? item.endsBefore.format(timeFormats.hm24) : null
  }
}

export function defaultDateRange() {
  const date = moment()
  const time = moment('0000', 'HHmm', true)

  return {
    from: date.format(dateFormats.y4md),
    fromEnabled: true,
    fromTime: time.format(timeFormats.hm24),
    to: date.add(1, 'd').format(dateFormats.y4md),
    toEnabled: true,
    toTime: time.format(timeFormats.hm24)
  }
}

export function newDateRange() {
  return {
    from: null,
    fromEnabled: true,
    fromTime: null,
    to: null,
    toEnabled: true,
    toTime: null
  }
}

export function resolveDateRange(dateRange) {
  const resolved = { from: null, to: null, valid: true }

  let from
  let to

  if (dateRange.fromEnabled) {
    from = moment.utc(
      `${dateRange.from} ${dateRange.fromTime}`,
      dateTimeFormats.y4md_hm24,
      true
    )

    if (from.isValid()) resolved.from = from.toISOString()
    else resolved.valid = false
  }

  if (dateRange.toEnabled) {
    to = moment.utc(
      `${dateRange.to} ${dateRange.toTime}`,
      dateTimeFormats.y4md_hm24,
      true
    )

    if (to.isValid()) resolved.to = to.toISOString()
    else resolved.valid = false
  }

  if (from && to && !from.isBefore(to)) resolved.valid = false

  return resolved
}

export function resolvedToIntervalMoment(resolved) {
  const newInterval = {}

  if (resolved.from) {
    newInterval.begins_at = resolved.from
    newInterval.ends_before = moment(resolved.from).add(1, 'ms')
  }

  return newInterval
}

export function resolvedToIntervalRange(resolved) {
  const newInterval = {}

  if (resolved.from) newInterval.begins_at = resolved.from
  if (resolved.to) newInterval.ends_before = resolved.to

  return newInterval
}

export function updateDateRange(dateRange, value) {
  const from = value.from && moment.utc(value.from)
  const to = value.to && moment.utc(value.to)

  dateRange.from = from && from.isValid() ? from.format(dateFormats.y4md) : null
  dateRange.to = to && to.isValid() ? to.format(dateFormats.y4md) : null
}
