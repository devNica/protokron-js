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