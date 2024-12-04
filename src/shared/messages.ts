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

import { MessageModel } from 'src/models/messages'

/**
 * Represents the messages of the Skeduller module
 */
export const skedullerMessages: MessageModel = {
  error: {
    namesDaysOfWeek: 'Invalid data: The day names are not consistent with the established language settings.',
    duplicateDayNames: 'Invalid data: One or more schedules have been detected sharing the same day of the week name.',
    noInputData: 'The input data has not been previously established.'
  },
  response: {
    flowError: 'Error in the order and flow of daily schedules',
    overlapError: 'Error due to overlap in the intervals defined for the daily schedule',
    noError: 'No errors were found, all schedules are consistent'
  },
  success: {}
}

/**
 * Represents the messages of the Kallendar module
 */
export const kallendarMessages: MessageModel = {
  error: {
    noInputData: 'The input data has not been previously established.',
    noParamsData: 'The fromStr and toStr parameters are required by the method.'
  },
  response: {},
  success: {}
}
