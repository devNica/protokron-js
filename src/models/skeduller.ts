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

import { DayWeekEnModel, DayWeekEsModel, Time24HModel } from './index'

/**
 * Represents or defines the structure of a schedule
 */
export type ScheduleItemModel = {
    opening: Time24HModel
    closing: Time24HModel
}

/**
 * Represents the structure of the input data of the Skeduller module
 */
export type SkedullerInputDataModel = {
    day: DayWeekEnModel | DayWeekEsModel
    schedules: ScheduleItemModel[]
    enabled: boolean
}

/**
 * Represents the configuration required by the Skeduller module
 */
export type SkedullerConfigModel = {
    lang: 'ES' | 'EN'
}

export type TimeFlowModel = 1 | 0

/**
 * Represents the response of the validation of the time flow
 */
export type TimeFlowCheckModel = {
    timeFlow: TimeFlowModel
    memoTimes: number[]
}

/**
 * Represents the response structure of the schedule validator
 */
export type DailyScheduleValidatorResponseModel = {
    isError: boolean
    message: string
    errorType: 'flowError' | 'overlapError' | 'noError',
    failedSchedule: Time24HModel[]
    failedgroupIndex: number
}
