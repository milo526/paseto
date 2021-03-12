const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24
const week = day * 7
const year = day * 365.25

const REGEX = /^(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)$/i

export const ms = (str: string): number => {
  const matched = REGEX.exec(str)

  if (!matched) {
    throw new TypeError(`invalid time period format ("${str}")`)
  }

  const value = parseFloat(matched[1])
  // unit typed as all possible values of the second capture group in the array
  // to prevent ts from detecting dead code paths.
  const unit = matched[2].toLowerCase() as
      'sec'|'secs'|'second'|'seconds'|'s'|
      'minute'|'minutes'|'min'|'mins'|'m'|
      'hour'|'hours'|'hr'|'hrs'|'h'|
      'day'|'days'|'d'|
      'week'|'weeks'|'w'|
      'year'|'years'|'yr'|'yrs'|'y'

  switch (unit) {
    case 'sec':
    case 'secs':
    case 'second':
    case 'seconds':
    case 's':
      return Math.round(value * second)
    case 'minute':
    case 'minutes':
    case 'min':
    case 'mins':
    case 'm':
      return Math.round(value * minute)
    case 'hour':
    case 'hours':
    case 'hr':
    case 'hrs':
    case 'h':
      return Math.round(value * hour)
    case 'day':
    case 'days':
    case 'd':
      return Math.round(value * day)
    case 'week':
    case 'weeks':
    case 'w':
      return Math.round(value * week)
    case 'year':
    case 'years':
    case 'yr':
    case 'yrs':
    case 'y':
      return Math.round(value * year)
  }
}
