/*
 * Copyright (c) 2024 Alejandro Gonzalez Sanchez
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { MultiFormatTimeModel, Time12HModel, Time24HModel, TimeCalculatorModel, DayEn, DayEs } from 'src/models'

const MILISECONDS = 1000 // miliseconds in a second
const SECONDS_HOUR = 3600 // seconds in an hour
const HOURS_DAY = 24 // Hours of the day
const MINUTES_HOUR = 60 // minutes in an hour

// Days of the week in english
export const namesDaysWeekEN: DayEn[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

// Days of the week in spanish
export const namesDaysWeekEs: DayEs[] = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado']

/**
 * Returns the day of the week of any date
 * @param {Date} date Any date of type Date
 * @example
 * const dayName = getDayName("2024-11-05T00:00:00Z");
 * console.log('dayName: ', dayName); // 'dayName: tuesday'
 */
export function getDayName (date: Date): DayEn {
  return namesDaysWeekEN[date.getDay()]
}

/**
 * Change time representation from decimal to 24 hour format
 * @param {number} decimalTime Any decimal representation of a time between "0" and "24"
 * @returns {Time24HModel} Return the time in 24 hour format
 * @example
 * const hour = convertDecimalTo24HourFormat(6.75);
 * console.log('hour: ', days); // 'hour: 06:45'
 */
export function convertDecimalTo24HourFormat (decimalTime: number): Time24HModel {
  if (decimalTime < 0 || decimalTime > 24) {
    throw Error('Invalid input format for decimal time')
  }

  const [hourStr, minStr] = decimalTime.toString().split('.')

  const minutes = Number(minStr) ? Math.ceil(Number('.' + minStr) * 60) : 0

  const hour = hourStr.padStart(2, '0')

  const time24h = `${hour}:${minutes.toString().padStart(2, '0')}` as Time24HModel

  return time24h
}

/**
 * Converts a time from 24-hour format to 12-hour format.
 * @param {Time24HModel} time - The time in 24-hour format (e.g., "14:30").
 * @returns {Time12HModel} - The time in 12-hour format (e.g., "02:30 PM").
 * @example
 * const time12h = convert24HourTo12HourFormat("14:30");
 * console.log(time12h); // "02:30 PM"
 */
export function convert24HourTo12HourFormat (time: Time24HModel): Time12HModel {
  const [h, m] = time.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 || 12
  return `${h12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${period}`
}

/**
 * Calculate the number of days between a range of dates,
 * with the option of including or not including the lower limit of the range
 * @param {Date} from Lower range limit date
 * @param {Date} to Upper range limit date
 * @param inclusive Include lower rank in count
 * @returns {number} Number of days between dates
 * @example
 * const days = calculateDaysBetweenDates("2024-11-05T00:00:00Z", "2024-11-15T00:00:00", true);
 * console.log('days: ', days); // 'days: 11'
 */
export function calculateDaysBetweenDates (from: Date, to: Date, inclusive = false): number {
  const differenceInMilliseconds = to.getTime() - from.getTime()

  const days = differenceInMilliseconds / (MILISECONDS * SECONDS_HOUR * HOURS_DAY)

  return days + Number(inclusive)
}

/**
 * Receives an array of two elements, containing two hours in 24h format
 * to operate arithmetically between them. The order of the elements does not matter
 * @param {Time24HModel[]} times Array times of hours in 24h format: [ t1,  t2 ]
 * @param {'sum' | 'sub'} mode Arithmetic mode of operation
 * @returns {MultiFormatTimeModel} Returns an object with the result in decimal format and 24-hour format
 * @example
 * const result = perforTimeArithmetic(['07:00', '15:00'], 'sub');
 * console.log('R: ', result); // 'R: { decimalTime: -8, time24H: '08:00' }'
 */
export function perforTimeArithmetic (times: Time24HModel[], mode: 'sum' | 'sub'): MultiFormatTimeModel {
  if (times.length !== 2) throw new Error('The number of elements in the array must be equal to "2"')

  const [h1, m1] = times[0].split(':').map(Number)
  const [h2, m2] = times[1].split(':').map(Number)

  const opOverHours = mode === 'sum' ? (h2 + h1) : (h2 - h1)
  const opOverMinutes = mode === 'sum' ? ((m2 + m1) / MINUTES_HOUR) : ((m2 - m1) / MINUTES_HOUR)

  const decimalTime = Math.abs((opOverHours) + (opOverMinutes))

  const time24h = convertDecimalTo24HourFormat(decimalTime)

  return {
    decimalTime,
    time24h
  }
}

/**
 * Calculate time between two dates
 * @param {Date} from Lower range date
 * @param {Date} to Upper range date
 * @returns {TimeCalculatorModel} Returns an object with the calculated time in hours, minutes and polarity
 * @example
 * const time = calculateTimeBetweenDates("2024-11-05T00:00:00Z", "2024-11-06T12:00:00");
 * console.log('time: ', time); // 'time: { timeInHours: 36, timeInMinutes: 864, timeInSeconds: 51840, polarity: true }'
 */
export function calculateTimeBetweenDates (from: Date, to: Date): TimeCalculatorModel {
  const timeInMiliseconds = to.getTime() - from.getTime()

  const timeInHours = timeInMiliseconds / (MILISECONDS * SECONDS_HOUR)
  const timeInMinutes = timeInHours / 60
  const timeInSeconds = timeInMinutes / 60

  const polarity = timeInMiliseconds > 0

  return { timeInHours, timeInMinutes, timeInSeconds, polarity }
}

/**
 * Extracts time from a date in iso8601 format
 * @param {Date} date Any entry date
 * @param {number} addHours optional value of hours that can be added to the result
 * @returns {Time24HModel} Returns a time in 24 hour format
 * @example
 * const time = getTimeFromDate("2024-11-05T07:45:00Z", 5);
 * console.log('time: ', time); // 'time: 12:45'
 */
export function getTimeFromDate (date: Date, addHours: number): Time24HModel {
  const adjustedDate = new Date(date)
  adjustedDate.setHours(date.getHours() + addHours)
  const hour = adjustedDate.getHours().toString().padStart(2, '0')
  const minutes = adjustedDate.getMinutes().toString().padStart(2, '0')

  return `${hour}:${minutes}`
}

/**
 * calculates the result of adding to the implicit time of any date, an amount of time specified in 24-hour format.
 * @param {Date} date Any entry date
 * @param {Time24HModel} hour value of hours that can be added to the result
 * @returns {Date} Returns the result of the operation
 * @example
 * const time = addTimeToDate(new Date("2024-10-01T:00:00:00Z"), "10:25");
 * console.log('time: ', time); // 'time: 2024-10-01T:10:25:00Z'
 */
export function addTimeToDate (date: Date, hour: Time24HModel): Date {
  const [hours, minutes] = hour.split(':').map(Number)

  if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours >= 24 || minutes < 0 || minutes >= 60) {
    throw new Error('The time format must be "HH:mm" and be in the valid range.')
  }

  const adjustDate = new Date(date)
  adjustDate.setHours(date.getHours() + hours, date.getMinutes() + minutes)

  return adjustDate
}
