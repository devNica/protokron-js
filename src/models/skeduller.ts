import { DayWeekEnModel, DayWeekEsModel } from "./callendar"
import { Time24HModel } from "./time"

export type ScheduleItemModel = {
    opening: Time24HModel
    closing: Time24HModel
}

export type SkedullerInputDataModel = {
    day: DayWeekEnModel | DayWeekEsModel
    schedules: ScheduleItemModel[]
    enabled: boolean
}

export type SkedullerConfigModel = {
    lang: 'ES' | 'EN'
}

export type TimeFlowModel = 1 | 0

export type TimeFlowCheckModel = {
    timeFlow: TimeFlowModel
    memoTimes: number[]
}


export type DailyScheduleValidatorResponseModel = {
    isError: boolean
    message: string
    errorType: 'flowError' | 'overlapError' | 'noError',
    failedSchedule: Time24HModel[]
    failedgroupIndex: number
}