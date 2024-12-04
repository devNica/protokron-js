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

import { Kallendar, Skeduller } from './core'
import { SkedullerConfigModel, SkedullerInputDataModel, KallendaConfigModel, MeetDataModel } from './models'

export * as CoreModels from './models'
export * as Tools from './shared'

/**
 * Protokron is a class that through the facade pattern provides an API for interaction 
 * with the Skeduller and Kallendar modules of the library itself.
 */
export default class Protokon {

    private static kallendarInstance: Kallendar

    private static skedullerInstance: Skeduller

    private constructor(){}

    /**
     * Initializes the `Skeduller` class with input data and configuration.
     * @param {SkedullerConfigModel} config Configuration required by the module.
     * @param {SkedullerInputDataModel} data Array of input schedules data.
     * @returns {Skeduller} An instance of the `Skeduller` module.
     */
    static initSkeduller(config: SkedullerConfigModel, data?: SkedullerInputDataModel[]): Skeduller {
        this.skedullerInstance = Skeduller.newInstance(config)

        if (data && data.length > 0) {
            this.skedullerInstance.setSchedules(data)
        }

        return this.skedullerInstance
    }

    /**
     * Initializes the `Kallendar` class with input data and configuration.
     * @param {KallendaConfigModel} config Configuration required by the module.
     * @param data Array of input meeting data. 
     * @returns {Kallendar} An instance of the `Kallendar` module
     */
    static initKallendar(config: KallendaConfigModel, data?: MeetDataModel[]): Kallendar {
        this.kallendarInstance = Kallendar.newInstance(config)

        if (data && data.length > 0) {
            this.kallendarInstance.setMeets(data)
        }

        return this.kallendarInstance
    }

}