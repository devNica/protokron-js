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


import { DayEn, Time24HModel, DayEs, TimeFlowCheckModel, SkedullerConfigModel, SkedullerInputDataModel, TimeFlowModel, DailyScheduleValidatorResponseModel } from "src/models"

import { addTimeToDate, namesDaysWeekEN, namesDaysWeekEs } from "src/shared"
import { skedullerMessages } from "src/shared/messages"


/**
 * Skeduller is a module of the Protokron-js library, 
 * which operates on data representing a service schedule organization, 
 * to determine whether or not there are inconsistencies in that data such as overlapping schedules, 
 * errors in the order of registration, or duplication of information.
 */
export class Skeduller {

    /**
     * times = [
     *  [ '07:00', '12:00', '14:00', '17:00' ],
        [ '07:00', '11:00', '10:00', '14:00' ],
        [ '08:00', '12:00', '11:00', '17:00' ],
        [ '08:00', '12:30', '12:45', '12:45' ],
        [ '09:00', '09:00', '14:00', '17:00' ],
        [ '08:00', '12:00', '14:00', '17:00' ],
        [ '10:00', '08:00', '16:00', '13:00' ]
      ]
     */
    private times: Time24HModel[][] = []

    /**
    * utcTimeInMilliSeconds = [
       [ 1672578000000, 1672596000000, 1672603200000, 1672614000000 ],
       [ 1672578000000, 1672592400000, 1672588800000, 1672603200000 ],
       [ 1672581600000, 1672596000000, 1672592400000, 1672614000000 ],
       [ 1672581600000, 1672597800000, 1672598700000, 1672598700000 ],
       [ 1672585200000, 1672585200000, 1672603200000, 1672614000000 ],
       [ 1672581600000, 1672596000000, 1672603200000, 1672614000000 ],
       [ 1672588800000, 1672581600000, 1672610400000, 1672599600000 ]
     ]
    */
    private utcTimeInMilliSeconds: number[][] = []

    /**
     * Configuration object for the Skeduller.
     */
    private config: SkedullerConfigModel

    /**
   * Input data containing ...
   */
    private schedules: SkedullerInputDataModel[] = []


    /**
     * Initializes the `Skeduller` class with input data and configuration.
     * @param _config Configuration required by the module.
     */
    private constructor(
        _config: SkedullerConfigModel
    ) {
        this.config = _config

    }

    /**
     * Factory method to create or retrieve a new instance of the `Skeduller` module.
     * @param config Configuration required by the module.
     * @returns An instance of the `Skeduller` module.
     */
    public static newInstance(
        config: SkedullerConfigModel
    ): Skeduller {
        return new Skeduller(config);
    }

    /**
     * Method to set schedules by day of the week
     * @param data Array of input schedules data.
     */
    setSchedules(data: SkedullerInputDataModel[]): void {
        this.schedules = data
        this.checkInputData()
    }

    /**
     * Checks the consistency of the input data
     */
    private checkInputData(): void {

        const errors: string[] = []

        const validDays: (DayEn | DayEs)[] = this.config.lang === 'EN'
            ? namesDaysWeekEN
            : namesDaysWeekEs

        const dayCounts: Record<DayEn | DayEs, number> = {} as Record<DayEn | DayEs, number>

        for (const { day } of this.schedules) {

            if (!validDays.includes(day.dayName)) {
                errors.push(skedullerMessages.error.namesDaysOfWeek)
            }

            dayCounts[day.dayName] = (dayCounts[day.dayName] || 0) + 1

            if (dayCounts[day.dayName] > 1) {
                errors.push(skedullerMessages.error.duplicateDayNames)
            }
        }

        if (errors.length > 0) {
            throw new Error(errors.join(' | '))
        }

    }

    /**
     * Checks whether the entered schedules are consistent in terms of the opening and closing hours 
     * defined for each day of the week.
     * @param {number[]} utcTimes Array of timestamps representing the schedules
     * @returns {TimeFlowCheckModel} Returns an object summarizing the flow of timestamps and an array of the time
     * window for each schedule.
     */
    private checkTimeFlow(utcTimes: number[]): TimeFlowCheckModel {
        let timeFlow: TimeFlowModel = 1
        let memoTimes = []

        for (let index = 0; index < utcTimes.length;) {
            const diff = utcTimes[index + 1] - utcTimes[index]
            memoTimes.push(diff)

            if (diff > 0) {

                timeFlow = 1
                index += 2

            } else if (diff <= 0) {

                timeFlow = 0

                break
            }

        }

        return {
            timeFlow,
            memoTimes
        }
    }

    /**
     * Verify that the timestamps defining the schedules for each day of the week do not overlap.
     * @param intervals 
     * @param sample 
     * @returns {boolean} Returns a value indicating whether or not the verification meets the validation criteria.
     */
    private checkOverlaps(intervals: number[], sample: number[]): boolean {

        const delta = Math.max(...sample) - Math.min(...sample)

        const accIntervals = intervals.reduce((acc, curr) => acc + curr)

        if ((sample.length / 2) > 2) {
            if ((delta - accIntervals) >= 0) return true
            else return false
        } else if ((delta - accIntervals) >= 0) return true

        else return false
    }


    /**
     * Validate a set of defined schedules for each day of the week.
     */
    public validateDailySchedules(): DailyScheduleValidatorResponseModel {

        if (!this.schedules || this.schedules.length === 0) {
            throw new Error(skedullerMessages.error.noInputData)
        }

        let response: DailyScheduleValidatorResponseModel = {
            isError: false,
            errorType: 'noError',
            message: skedullerMessages.response.noError,
            failedSchedule: [],
            failedgroupIndex: 0
        }

        this.schedules.forEach((item, index) => {
            item.schedules.forEach((ele) => {
                this.times[index] = [...this.times[index] || [], ...Object.values(ele)]
            })
        })

        this.times.forEach((group, index) => {
            this.utcTimeInMilliSeconds[index] = group.map(time => addTimeToDate(new Date(), time).getTime() ?? 0)
        })

        for (let index = 0; index < this.utcTimeInMilliSeconds.length;) {

            const sample = this.utcTimeInMilliSeconds[index]

            const { timeFlow, memoTimes } = this.checkTimeFlow(sample)

            if (!timeFlow) {
                response.isError = true
                response.message = skedullerMessages.response.flowError
                response.errorType = 'flowError'
                response.failedSchedule = this.times[index]
                response.failedgroupIndex = index
                break
            }

            if (!this.checkOverlaps(memoTimes, sample)) {
                response.isError = true
                response.message = skedullerMessages.response.overlapError
                response.errorType = 'overlapError'
                response.failedSchedule = this.times[index]
                response.failedgroupIndex = index
                break
            }

            index++
        }

        return response
    }
}

