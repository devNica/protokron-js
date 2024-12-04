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

import { DayEn, DateFormatISO8601, Time24HModel } from './index'

/**
 * Represents a date and time in iso 8601 format (e.g, "2024-10-31T14:45:35Z")
 */
export type ISODateString = `${string}-${string}-${string}T${string}:${string}:${string}Z`

/**
 * Represents the shift model
 */
export type ShiftModel = {
    desc: string
    from: Time24HModel
    to: Time24HModel
}

/**
 * Represents the model of the input data of the meetings for the Kallendar module
 */
export type MeetDataModel<S = unknown, T = unknown> = {
    id: number | string
    guest?: {
        id: number | string
        fullname: string
    }
    subject?: {
        id: number | string
        fullname: string
    }
    startAt: ISODateString
    endAt: ISODateString
    endBreakAt: ISODateString
    locationData?: S
    attachedInfo?: T
    shift: {
        id: number | string
        reference: string
    }
}

/**
 * Represents the model of the schedules
 */
export type KallendaConfigModel = {
    startTime: Time24HModel
    endTime: Time24HModel
    breakTimeInHours: number
    durationMeetingInHours: number
    shifts: ShiftModel[]
}

/**
 * Represents the model of the schedules
 */
export type SchedulesModel = {
    from: Time24HModel
    to: Time24HModel
    date: DateFormatISO8601
}

/**
 * Represents the model of shift schedules
 */
export type ShiftScheduleModel = SchedulesModel & {
    shift: string
}

/**
 * Represents the model of the meeting calendar
 */
export type CalendarModel = Record<Partial<DayEn>, ShiftScheduleModel[]>
