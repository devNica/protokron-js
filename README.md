## Classes

<dl>
<dt><a href="#Protokon">Protokon</a></dt>
<dd><p>Protokron is a class that through the facade pattern provides an API for interaction
with the Skeduller and Kallendar modules of the library itself.</p>
</dd>
<dt><a href="#Kallendar">Kallendar</a></dt>
<dd><p>Kallendar is a module of the Protokron-js library,
which operates on data representing a set of scheduled meetings,
from which another set of schedules are extracted that are enabled to schedule new appointments.</p>
</dd>
<dt><a href="#Skeduller">Skeduller</a></dt>
<dd><p>Skeduller is a module of the Protokron-js library,
which operates on data representing a service schedule organization,
to determine whether or not there are inconsistencies in that data such as overlapping schedules,
errors in the order of registration, or duplication of information.</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#skedullerMessages">skedullerMessages</a></dt>
<dd><p>Represents the messages of the Skeduller module</p>
</dd>
<dt><a href="#kallendarMessages">kallendarMessages</a></dt>
<dd><p>Represents the messages of the Kallendar module</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#getDayName">getDayName(date)</a></dt>
<dd><p>Returns the day of the week of any date</p>
</dd>
<dt><a href="#convertDecimalTo24HourFormat">convertDecimalTo24HourFormat(decimalTime)</a> ⇒ <code>Time24HModel</code></dt>
<dd><p>Change time representation from decimal to 24 hour format</p>
</dd>
<dt><a href="#convert24HourTo12HourFormat">convert24HourTo12HourFormat(time)</a> ⇒ <code>Time12HModel</code></dt>
<dd><p>Converts a time from 24-hour format to 12-hour format.</p>
</dd>
<dt><a href="#calculateDaysBetweenDates">calculateDaysBetweenDates(from, to, inclusive)</a> ⇒ <code>number</code></dt>
<dd><p>Calculate the number of days between a range of dates,
with the option of including or not including the lower limit of the range</p>
</dd>
<dt><a href="#perforTimeArithmetic">perforTimeArithmetic(times, mode)</a> ⇒ <code>MultiFormatTimeModel</code></dt>
<dd><p>Receives an array of two elements, containing two hours in 24h format
to operate arithmetically between them. The order of the elements does not matter</p>
</dd>
<dt><a href="#calculateTimeBetweenDates">calculateTimeBetweenDates(from, to)</a> ⇒ <code>TimeCalculatorModel</code></dt>
<dd><p>Calculate time between two dates</p>
</dd>
<dt><a href="#getTimeFromDate">getTimeFromDate(date, addHours)</a> ⇒ <code>Time24HModel</code></dt>
<dd><p>Extracts time from a date in iso8601 format</p>
</dd>
<dt><a href="#addTimeToDate">addTimeToDate(date, hour)</a> ⇒ <code>Date</code></dt>
<dd><p>calculates the result of adding to the implicit time of any date, an amount of time specified in 24-hour format.</p>
</dd>
</dl>

<a name="Kallendar"></a>

## Kallendar
Kallendar is a module of the Protokron-js library,
which operates on data representing a set of scheduled meetings,
from which another set of schedules are extracted that are enabled to schedule new appointments.

**Kind**: global class  

* [Kallendar](#Kallendar)
    * [new Kallendar(_config)](#new_Kallendar_new)
    * _instance_
        * [.meetingsPerDay](#Kallendar+meetingsPerDay)
        * [.totalMeetingTime](#Kallendar+totalMeetingTime)
        * [.meets](#Kallendar+meets)
        * [.setMeets(data)](#Kallendar+setMeets)
        * [.calculateNumberMeetingsPerDay()](#Kallendar+calculateNumberMeetingsPerDay)
        * [.separateIntoShifts(schedules)](#Kallendar+separateIntoShifts) ⇒
        * [.groupSchedulesByDayWeek(data)](#Kallendar+groupSchedulesByDayWeek) ⇒
        * [.caculateAvailableSchedules(schedulesDates, freeDates)](#Kallendar+caculateAvailableSchedules) ⇒
        * [.availableTimes(fromStr, toStr)](#Kallendar+availableTimes) ⇒
    * _static_
        * [.newInstance(config)](#Kallendar.newInstance) ⇒

<a name="new_Kallendar_new"></a>

### new Kallendar(_config)
Initializes the `Kallendar` class with input data and configuration.


| Param | Description |
| --- | --- |
| _config | Configuration required by the module. |

<a name="Kallendar+meetingsPerDay"></a>

### kallendar.meetingsPerDay
Number of meetings that can be scheduled per day.

**Kind**: instance property of [<code>Kallendar</code>](#Kallendar)  
<a name="Kallendar+totalMeetingTime"></a>

### kallendar.totalMeetingTime
Total duration of a meeting including break time, in hours.

**Kind**: instance property of [<code>Kallendar</code>](#Kallendar)  
<a name="Kallendar+meets"></a>

### kallendar.meets
Input data containing pre-scheduled meetings.

**Kind**: instance property of [<code>Kallendar</code>](#Kallendar)  
<a name="Kallendar+setMeets"></a>

### kallendar.setMeets(data)
Method to set schedules by day of the week

**Kind**: instance method of [<code>Kallendar</code>](#Kallendar)  

| Param | Description |
| --- | --- |
| data | Array of input meeting data. |

<a name="Kallendar+calculateNumberMeetingsPerDay"></a>

### kallendar.calculateNumberMeetingsPerDay()
Calculates the number of meetings that can be scheduled per day.
This is based on the start and end time and the total meeting duration.

**Kind**: instance method of [<code>Kallendar</code>](#Kallendar)  
<a name="Kallendar+separateIntoShifts"></a>

### kallendar.separateIntoShifts(schedules) ⇒
Receives an array of valid meeting times and returns an array of the input data categorized by shift

**Kind**: instance method of [<code>Kallendar</code>](#Kallendar)  
**Returns**: An array of schedules categorized by shift.  

| Param | Description |
| --- | --- |
| schedules | Schedules valid in a date range |

<a name="Kallendar+groupSchedulesByDayWeek"></a>

### kallendar.groupSchedulesByDayWeek(data) ⇒
Receives an array of valid times and returns the entry classified and grouped by weekday

**Kind**: instance method of [<code>Kallendar</code>](#Kallendar)  
**Returns**: A calendar model with schedules grouped by weekday.  

| Param | Description |
| --- | --- |
| data | Array of valid times |

<a name="Kallendar+caculateAvailableSchedules"></a>

### kallendar.caculateAvailableSchedules(schedulesDates, freeDates) ⇒
Calculates available schedules based on partially or fully occupied dates.

**Kind**: instance method of [<code>Kallendar</code>](#Kallendar)  
**Returns**: An array of schedules with available time slots.  

| Param | Description |
| --- | --- |
| schedulesDates | Array of occupied dates and their corresponding events. |
| freeDates | Array of completely free dates. |

<a name="Kallendar+availableTimes"></a>

### kallendar.availableTimes(fromStr, toStr) ⇒
Main public method to calculate available times for scheduling meetings.

**Kind**: instance method of [<code>Kallendar</code>](#Kallendar)  
**Returns**: A calendar model with available times grouped by day of the week and shifts.  

| Param | Description |
| --- | --- |
| fromStr | Start date in ISO format (YYYY-MM-DD). |
| toStr | End date in ISO format (YYYY-MM-DD). |

<a name="Kallendar.newInstance"></a>

### Kallendar.newInstance(config) ⇒
Factory method to create or retrieve a new instance of the `Kallendar` module.

**Kind**: static method of [<code>Kallendar</code>](#Kallendar)  
**Returns**: An instance of the `Kallendar` module.  

| Param | Description |
| --- | --- |
| config | Configuration required by the module. |

<a name="Skeduller"></a>

## Skeduller
Skeduller is a module of the Protokron-js library,
which operates on data representing a service schedule organization,
to determine whether or not there are inconsistencies in that data such as overlapping schedules,
errors in the order of registration, or duplication of information.

**Kind**: global class  

* [Skeduller](#Skeduller)
    * [new Skeduller(_config)](#new_Skeduller_new)
    * _instance_
        * [.times](#Skeduller+times)
        * [.utcTimeInMilliSeconds](#Skeduller+utcTimeInMilliSeconds)
        * [.schedules](#Skeduller+schedules)
        * [.setSchedules(data)](#Skeduller+setSchedules)
        * [.checkInputData()](#Skeduller+checkInputData)
        * [.checkTimeFlow(utcTimes)](#Skeduller+checkTimeFlow) ⇒ <code>TimeFlowCheckModel</code>
        * [.checkOverlaps(intervals, sample)](#Skeduller+checkOverlaps) ⇒ <code>boolean</code>
        * [.validateDailySchedules()](#Skeduller+validateDailySchedules)
    * _static_
        * [.newInstance(config)](#Skeduller.newInstance) ⇒

<a name="new_Skeduller_new"></a>

### new Skeduller(_config)
Initializes the `Skeduller` class with input data and configuration.


| Param | Description |
| --- | --- |
| _config | Configuration required by the module. |

<a name="Skeduller+times"></a>

### skeduller.times
times = [
 [ '07:00', '12:00', '14:00', '17:00' ],
            [ '07:00', '11:00', '10:00', '14:00' ],
            [ '08:00', '12:00', '11:00', '17:00' ],
            [ '08:00', '12:30', '12:45', '12:45' ],
            [ '09:00', '09:00', '14:00', '17:00' ],
            [ '08:00', '12:00', '14:00', '17:00' ],
            [ '10:00', '08:00', '16:00', '13:00' ]
          ]

**Kind**: instance property of [<code>Skeduller</code>](#Skeduller)  
<a name="Skeduller+utcTimeInMilliSeconds"></a>

### skeduller.utcTimeInMilliSeconds
utcTimeInMilliSeconds = [
           [ 1672578000000, 1672596000000, 1672603200000, 1672614000000 ],
           [ 1672578000000, 1672592400000, 1672588800000, 1672603200000 ],
           [ 1672581600000, 1672596000000, 1672592400000, 1672614000000 ],
           [ 1672581600000, 1672597800000, 1672598700000, 1672598700000 ],
           [ 1672585200000, 1672585200000, 1672603200000, 1672614000000 ],
           [ 1672581600000, 1672596000000, 1672603200000, 1672614000000 ],
           [ 1672588800000, 1672581600000, 1672610400000, 1672599600000 ]
         ]

**Kind**: instance property of [<code>Skeduller</code>](#Skeduller)  
<a name="Skeduller+schedules"></a>

### skeduller.schedules
Input data containing ...

**Kind**: instance property of [<code>Skeduller</code>](#Skeduller)  
<a name="Skeduller+setSchedules"></a>

### skeduller.setSchedules(data)
Method to set schedules by day of the week

**Kind**: instance method of [<code>Skeduller</code>](#Skeduller)  

| Param | Description |
| --- | --- |
| data | Array of input schedules data. |

<a name="Skeduller+checkInputData"></a>

### skeduller.checkInputData()
Checks the consistency of the input data

**Kind**: instance method of [<code>Skeduller</code>](#Skeduller)  
<a name="Skeduller+checkTimeFlow"></a>

### skeduller.checkTimeFlow(utcTimes) ⇒ <code>TimeFlowCheckModel</code>
Checks whether the entered schedules are consistent in terms of the opening and closing hours
defined for each day of the week.

**Kind**: instance method of [<code>Skeduller</code>](#Skeduller)  
**Returns**: <code>TimeFlowCheckModel</code> - Returns an object summarizing the flow of timestamps and an array of the time
window for each schedule.  

| Param | Type | Description |
| --- | --- | --- |
| utcTimes | <code>Array.&lt;number&gt;</code> | Array of timestamps representing the schedules |

<a name="Skeduller+checkOverlaps"></a>

### skeduller.checkOverlaps(intervals, sample) ⇒ <code>boolean</code>
Verify that the timestamps defining the schedules for each day of the week do not overlap.

**Kind**: instance method of [<code>Skeduller</code>](#Skeduller)  
**Returns**: <code>boolean</code> - Returns a value indicating whether or not the verification meets the validation criteria.  

| Param |
| --- |
| intervals | 
| sample | 

<a name="Skeduller+validateDailySchedules"></a>

### skeduller.validateDailySchedules()
Validate a set of defined schedules for each day of the week.

**Kind**: instance method of [<code>Skeduller</code>](#Skeduller)  
<a name="Skeduller.newInstance"></a>

### Skeduller.newInstance(config) ⇒
Factory method to create or retrieve a new instance of the `Skeduller` module.

**Kind**: static method of [<code>Skeduller</code>](#Skeduller)  
**Returns**: An instance of the `Skeduller` module.  

| Param | Description |
| --- | --- |
| config | Configuration required by the module. |

<a name="Protokon"></a>

## Protokon
Protokron is a class that through the facade pattern provides an API for interaction
with the Skeduller and Kallendar modules of the library itself.

**Kind**: global class  

* [Protokon](#Protokon)
    * [.initSkeduller(config, data)](#Protokon.initSkeduller) ⇒ [<code>Skeduller</code>](#Skeduller)
    * [.initKallendar(config, data)](#Protokon.initKallendar) ⇒ [<code>Kallendar</code>](#Kallendar)

<a name="Protokon.initSkeduller"></a>

### Protokon.initSkeduller(config, data) ⇒ [<code>Skeduller</code>](#Skeduller)
Initializes the `Skeduller` class with input data and configuration.

**Kind**: static method of [<code>Protokon</code>](#Protokon)  
**Returns**: [<code>Skeduller</code>](#Skeduller) - An instance of the `Skeduller` module.  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>SkedullerConfigModel</code> | Configuration required by the module. |
| data | <code>SkedullerInputDataModel</code> | Array of input schedules data. |

<a name="Protokon.initKallendar"></a>

### Protokon.initKallendar(config, data) ⇒ [<code>Kallendar</code>](#Kallendar)
Initializes the `Kallendar` class with input data and configuration.

**Kind**: static method of [<code>Protokon</code>](#Protokon)  
**Returns**: [<code>Kallendar</code>](#Kallendar) - An instance of the `Kallendar` module  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>KallendaConfigModel</code> | Configuration required by the module. |
| data |  | Array of input meeting data. |

<a name="skedullerMessages"></a>

## skedullerMessages
Represents the messages of the Skeduller module

**Kind**: global variable  
<a name="kallendarMessages"></a>

## kallendarMessages
Represents the messages of the Kallendar module

**Kind**: global variable  
<a name="getDayName"></a>

## getDayName(date)
Returns the day of the week of any date

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | Any date of type Date |

**Example**  
```js
const dayName = getDayName("2024-11-05T00:00:00Z");
console.log('dayName: ', dayName); // 'dayName: tuesday'
```
<a name="convertDecimalTo24HourFormat"></a>

## convertDecimalTo24HourFormat(decimalTime) ⇒ <code>Time24HModel</code>
Change time representation from decimal to 24 hour format

**Kind**: global function  
**Returns**: <code>Time24HModel</code> - Return the time in 24 hour format  

| Param | Type | Description |
| --- | --- | --- |
| decimalTime | <code>number</code> | Any decimal representation of a time between "0" and "24" |

**Example**  
```js
const hour = convertDecimalTo24HourFormat(6.75);
console.log('hour: ', days); // 'hour: 06:45'
```
<a name="convert24HourTo12HourFormat"></a>

## convert24HourTo12HourFormat(time) ⇒ <code>Time12HModel</code>
Converts a time from 24-hour format to 12-hour format.

**Kind**: global function  
**Returns**: <code>Time12HModel</code> - - The time in 12-hour format (e.g., "02:30 PM").  

| Param | Type | Description |
| --- | --- | --- |
| time | <code>Time24HModel</code> | The time in 24-hour format (e.g., "14:30"). |

**Example**  
```js
const time12h = convert24HourTo12HourFormat("14:30");
console.log(time12h); // "02:30 PM"
```
<a name="calculateDaysBetweenDates"></a>

## calculateDaysBetweenDates(from, to, inclusive) ⇒ <code>number</code>
Calculate the number of days between a range of dates,
with the option of including or not including the lower limit of the range

**Kind**: global function  
**Returns**: <code>number</code> - Number of days between dates  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| from | <code>Date</code> |  | Lower range limit date |
| to | <code>Date</code> |  | Upper range limit date |
| inclusive |  | <code>false</code> | Include lower rank in count |

**Example**  
```js
const days = calculateDaysBetweenDates("2024-11-05T00:00:00Z", "2024-11-15T00:00:00", true);
console.log('days: ', days); // 'days: 11'
```
<a name="perforTimeArithmetic"></a>

## perforTimeArithmetic(times, mode) ⇒ <code>MultiFormatTimeModel</code>
Receives an array of two elements, containing two hours in 24h format
to operate arithmetically between them. The order of the elements does not matter

**Kind**: global function  
**Returns**: <code>MultiFormatTimeModel</code> - Returns an object with the result in decimal format and 24-hour format  

| Param | Type | Description |
| --- | --- | --- |
| times | <code>Array.&lt;Time24HModel&gt;</code> | Array times of hours in 24h format: [ t1,  t2 ] |
| mode | <code>&#x27;sum&#x27;</code> \| <code>&#x27;sub&#x27;</code> | Arithmetic mode of operation |

**Example**  
```js
const result = perforTimeArithmetic(['07:00', '15:00'], 'sub');
console.log('R: ', result); // 'R: { decimalTime: -8, time24H: '08:00' }'
```
<a name="calculateTimeBetweenDates"></a>

## calculateTimeBetweenDates(from, to) ⇒ <code>TimeCalculatorModel</code>
Calculate time between two dates

**Kind**: global function  
**Returns**: <code>TimeCalculatorModel</code> - Returns an object with the calculated time in hours, minutes and polarity  

| Param | Type | Description |
| --- | --- | --- |
| from | <code>Date</code> | Lower range date |
| to | <code>Date</code> | Upper range date |

**Example**  
```js
const time = calculateTimeBetweenDates("2024-11-05T00:00:00Z", "2024-11-06T12:00:00");
console.log('time: ', time); // 'time: { timeInHours: 36, timeInMinutes: 864, timeInSeconds: 51840, polarity: true }'
```
<a name="getTimeFromDate"></a>

## getTimeFromDate(date, addHours) ⇒ <code>Time24HModel</code>
Extracts time from a date in iso8601 format

**Kind**: global function  
**Returns**: <code>Time24HModel</code> - Returns a time in 24 hour format  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | Any entry date |
| addHours | <code>number</code> | optional value of hours that can be added to the result |

**Example**  
```js
const time = getTimeFromDate("2024-11-05T07:45:00Z", 5);
console.log('time: ', time); // 'time: 12:45'
```
<a name="addTimeToDate"></a>

## addTimeToDate(date, hour) ⇒ <code>Date</code>
calculates the result of adding to the implicit time of any date, an amount of time specified in 24-hour format.

**Kind**: global function  
**Returns**: <code>Date</code> - Returns the result of the operation  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | Any entry date |
| hour | <code>Time24HModel</code> | value of hours that can be added to the result |

**Example**  
```js
const time = addTimeToDate(new Date("2024-10-01T:00:00:00Z"), "10:25");
console.log('time: ', time); // 'time: 2024-10-01T:10:25:00Z'
```
