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

import { MeetDataModel } from './index'

/**
 * Represents a date in ISO8601 format
 */
export type DateFormatISO8601 = `${string}-${string}-${string}`

/**
 * Represents a time in 24-hour format.
 * Time in HH:mm format (e.g., "14:30").
 */
export type Time24HModel = `${string}:${string}`

/**
 * Represents a time in 12-hour format.
 * Time in hh:mm AM/PM format (e.g., "02:30 PM").
 */
export type Time12HModel = `${string}:${string} ${'AM' | 'PM'}`

/**
 * Represents the time calculated in different units
 * Time in units of hours (e.g., 2).
 * Time in units of minutes (e.g, 120).
 * Time in units of seconds (e.g, 7200).
 */
export type TimeCalculatorModel = {
    timeInHours: number
    timeInMinutes: number
    timeInSeconds: number
    polarity: boolean
}

/**
 * Represents the time calculated in different formats
 * Time in HH:mm format (e.g, '05:00').
 * Time in decimal format (e.g., 5).
 */
export type MultiFormatTimeModel = {
    time24h: Time24HModel,
    decimalTime: number
}

/**
 * Represents the dates free of meetings
 * target in Date ISO8601 format (e.g, '2024-10-31').
 */
export type FreeDatesModel = {
    target: DateFormatISO8601
}

/**
 * Represents dates partially or fully occupied with meetings
 * ScheduledDatesModel (e.g,
 * {
 *    "id": 1,
 *    "startAt": "2024-05-13T07:00:00Z",
 *    "endAt": "2024-05-13T11:00:00Z",
 *    "endBreakAt": "2024-05-13T12:00:00Z",
 *    "shift": {
 *       "id": 1,
 *         "reference": "turno 1"
 *    },
 *    "target": "2024-10-31"
 * }
 * ).
 */
export type ScheduledDatesModel = MeetDataModel & FreeDatesModel
