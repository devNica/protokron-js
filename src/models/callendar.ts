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

import { ShiftModel } from './index'

/**
 * Names of the days of the week in english
 */
export type DayEn = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

/**
 * Names of the days of the week in spanish
 */
export type DayEs = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo'

/**
 * Represents a schedule block
 */
export type ScheduleBlockModel = {
    from: string
    to: string
    date: string
    shift?: ShiftModel
}

/**
 * Represents the model of available times in EN
 */
export type AvailableTimesModelEn = Record<Partial<DayEn>, ScheduleBlockModel[]>

/**
 * Represents the model of available times in ES
 */
export type AvailableTimesModelEs = Record<Partial<DayEs>, ScheduleBlockModel[]>

export type DayWeekEnModel = {
    id?: number | string
    dayName: DayEn
}

export type DayWeekEsModel = {
    id?: number | string
    dayName: DayEs
}
