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

import { CalendarModel, DateFormatISO8601, DayEn, FreeDatesModel, MeetDataModel, KallendaConfigModel, ScheduledDatesModel, SchedulesModel, ShiftScheduleModel } from '../models'
import { perforTimeArithmetic, convert24HourTo12HourFormat, convertDecimalTo24HourFormat, getDayName, calculateDaysBetweenDates, calculateTimeBetweenDates, getTimeFromDate, kallendarMessages } from '../shared'

/**
 * Kallendar is a module of the Protokron-js library,
 * which operates on data representing a set of scheduled meetings,
 * from which another set of schedules are extracted that are enabled to schedule new appointments.
 */
export class Kallendar {
  /**
     * Configuration object for the scheduler.
     */
  private config: KallendaConfigModel

  /**
     * Number of meetings that can be scheduled per day.
     */
  private meetingsPerDay = 0

  /**
     * Total duration of a meeting including break time, in hours.
     */
  private totalMeetingTime = 0

  /**
    * Input data containing pre-scheduled meetings.
    */
  private meets: MeetDataModel[] = []

  /**
     * Initializes the `Kallendar` class with input data and configuration.
     * @param _config Configuration required by the module.
     */
  private constructor (
    _config: KallendaConfigModel
  ) {
    // this.data = _data
    this.config = _config
    this.totalMeetingTime = (
      this.config.durationMeetingInHours +
            this.config.breakTimeInHours
    )
  }

  /**
     * Factory method to create or retrieve a new instance of the `Kallendar` module.
     * @param config Configuration required by the module.
     * @returns An instance of the `Kallendar` module.
     */
  public static newInstance (
    config: KallendaConfigModel

  ): Kallendar {
    return new Kallendar(config)
  }

  /**
     * Method to set schedules by day of the week
     * @param data Array of input meeting data.
     */
  setMeets (data: MeetDataModel[]): void {
    this.meets = data
  }

  /**
    * Calculates the number of meetings that can be scheduled per day.
    * This is based on the start and end time and the total meeting duration.
    */
  private calculateNumberMeetingsPerDay () {
    const { decimalTime } = perforTimeArithmetic(
      [
        this.config.startTime,
        this.config.endTime
      ],
      'sub'
    )

    this.meetingsPerDay = Math.floor(decimalTime / this.totalMeetingTime)
  }

  /**
     * Receives an array of valid meeting times and returns an array of the input data categorized by shift
     * @param schedules Schedules valid in a date range
     * @returns An array of schedules categorized by shift.
     */
  private separateIntoShifts (
    schedules: SchedulesModel[]
  ): ShiftScheduleModel[] {
    return schedules.flatMap(schedule => {
      let startTime = Number(schedule.from.substring(0, 2))

      return this.config.shifts.flatMap(shift => {
        const shiftStart = Number(shift.from.substring(0, 2))
        const shiftEnd = Number(shift.to.substring(0, 2))

        if (startTime >= shiftStart && startTime <= shiftEnd) {
          const endTime = startTime + this.config.durationMeetingInHours

          const result: ShiftScheduleModel = {
            shift: shift.desc,
            from: convert24HourTo12HourFormat(convertDecimalTo24HourFormat(startTime)),
            to: convert24HourTo12HourFormat(convertDecimalTo24HourFormat(endTime)),
            date: schedule.date
          }

          startTime = endTime

          return result
        }

        return []
      })
    })
  }

  /**
     * Receives an array of valid times and returns the entry classified and grouped by weekday
     * @param data Array of valid times
     * @returns A calendar model with schedules grouped by weekday.
     */
  private groupSchedulesByDayWeek (data: ShiftScheduleModel[]): CalendarModel {
    return data.reduce(
      (calendar: CalendarModel, item: ShiftScheduleModel) => {
        const dayOfWeek = getDayName(new Date(`${item.date}T00:00:00`)) as DayEn

        calendar[dayOfWeek] = calendar[dayOfWeek] || []
        calendar[dayOfWeek].push(item)

        return calendar
      }, {} as CalendarModel)
  }

  private filteredData (from: Date, to: Date): void {
    this.meets = this.meets.filter(ele => {
      const meetDate = new Date(ele.startAt.slice(0, 10))
      return meetDate >= from && meetDate <= to
    }).sort((a, b) =>
      (new Date(a.startAt).getTime() - new Date(b.startAt).getTime())
    )
  }

  /**
     * Calculates available schedules based on partially or fully occupied dates.
     * @param schedulesDates Array of occupied dates and their corresponding events.
     * @param freeDates Array of completely free dates.
     * @returns An array of schedules with available time slots.
     */
  private caculateAvailableSchedules (
    schedulesDates: ScheduledDatesModel[][],
    freeDates: FreeDatesModel[]
  ): SchedulesModel[] {
    const schedules: SchedulesModel[] = []

    schedulesDates.forEach(day => {
      let start = `${day[0].target}T${this.config.startTime}:00Z` // Agenda  Start Time
      const end = `${day[0].target}T${this.config.endTime}:00Z` // Agenda End Time

      day.forEach((event, index) => {
        const currentEnd = new Date(event.startAt) // Start of current event
        const nextStart = new Date(day[index + 1]?.startAt || end) // Start next event

        // Calculate time available before current event
        const gap = calculateTimeBetweenDates(new Date(start), currentEnd)

        if (gap.timeInHours >= this.totalMeetingTime) {
          // Add enough space for a meeting
          schedules.push({
            from: getTimeFromDate(new Date(start), 0),
            to: getTimeFromDate(currentEnd, 0),
            date: day[0].target
          })

          // Adjust `start` to handle consecutive meetings
          start = event.endBreakAt || currentEnd.toISOString()
        } else {
          // Out of space: move start to end current event
          start = event.endBreakAt || currentEnd.toISOString()
        }

        // Evaluate the `gap`  between the end of the current event and the start of the next event
        const futureGap = calculateTimeBetweenDates(new Date(start), nextStart)

        if (futureGap.timeInHours >= this.totalMeetingTime) {
          schedules.push({
            from: getTimeFromDate(new Date(start), 0),
            to: getTimeFromDate(nextStart, 0),
            date: day[0].target
          })

          // Advance to the start of the next event
          start = nextStart.toISOString()
        }

        start = event.endBreakAt || end
      })

      // Evaluate remaining space at the end of the day
      const finalGap = calculateTimeBetweenDates(new Date(start), new Date(end))

      if (finalGap.timeInHours > this.totalMeetingTime) {
        schedules.push({
          from: getTimeFromDate(new Date(start), 0),
          to: getTimeFromDate(new Date(end), 0),
          date: day[0].target
        })
      }
    })

    freeDates.forEach(date => {
      const dayStart = new Date(`${date.target}T${this.config.startTime}:00Z`)

      for (let i = 0; i < this.meetingsPerDay; i++) {
        const from = new Date(dayStart)
        const to = new Date(dayStart)
        const totalDuration = this.config.durationMeetingInHours + this.config.breakTimeInHours

        from.setHours(dayStart.getHours() + totalDuration * i)
        to.setHours(from.getHours() + totalDuration)

        schedules.push({
          from: getTimeFromDate(from, 0),
          to: getTimeFromDate(to, 0),
          date: date.target
        })
      }
    })

    return schedules
  }

  /**
   * Main public method to calculate available times for scheduling meetings.
   * @param fromStr Start date in ISO format (YYYY-MM-DD).
   * @param toStr End date in ISO format (YYYY-MM-DD).
   * @param {boolean} reqFilter Filter by date range
   * @returns A calendar model with available times grouped by day of the week and shifts.
   */
  public availableTimes (fromStr: string, toStr: string, reqFilter: boolean): CalendarModel {
    if (!fromStr || !toStr) {
      throw new Error(kallendarMessages.error.noParamsData)
    }

    if (!this.meets || this.meets.length === 0) {
      throw new Error(kallendarMessages.error.noInputData)
    }

    const from = new Date(fromStr)
    const to = new Date(toStr)

    this.calculateNumberMeetingsPerDay()

    if (reqFilter) this.filteredData(from, to)

    const totalDays = calculateDaysBetweenDates(from, to)
    const freeDates: FreeDatesModel[] = []
    const scheduledDates: ScheduledDatesModel[][] = []

    for (let i = 0; i <= totalDays; i++) {
      const currentDate = new Date(from)
      currentDate.setDate(from.getDate() + i)

      const dayData = this.meets.filter(item => {
        const meetingDate = new Date(item.startAt.slice(0, 10))
        return meetingDate.getTime() === currentDate.getTime()
      }).map(d => ({
        ...d,
        target: currentDate.toISOString().slice(0, 10) as DateFormatISO8601
      }))

      if (dayData.length > 0) {
        scheduledDates.push(dayData)
      } else {
        freeDates.push({
          target: currentDate.toISOString().slice(0, 10) as DateFormatISO8601
        })
      }
    }

    const schedulesAvailables: SchedulesModel[] = this.caculateAvailableSchedules(
      scheduledDates,
      freeDates
    )

    const shiftSchedules = this.separateIntoShifts(
      schedulesAvailables
    )

    return this.groupSchedulesByDayWeek(shiftSchedules)
  }
}
