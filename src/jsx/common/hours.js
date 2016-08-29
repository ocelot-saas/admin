export function ToHours(apiHours) {
    if (apiHours.start.hour == 0 &&
        apiHours.start.minute == 0 &&
	apiHours.end.hour == 23 &&
	apiHours.end.minute == 59) {
	return {
	    nonStop: true,
	    start: '00:00 AM',
	    end: '11:59 PM'
	}
    } else {
	return {
	    nonStop: false,
	    start: _ToHoursString(apiHours.start),
	    end: _ToHoursString(apiHours.end)
	}
    }
}


export function ExtractHours(hours) {
    if (hours.nonStop) {
        return {
            start: {hour: 0, minute: 0},
            end: {hour: 23, minute: 59}
        };
    } else {
        return {
            start: _ExtractHourFromString(hours.start),
            end: _ExtractHourFromString(hours.end)
        };
    }
}


function _ToHoursString(apiHour) {
    if (apiHour.hour > 12) {
	return `${apiHour.hour - 12}:${apiHour.minute} PM`;
    } else {
	return `${apiHour.hour}:${apiHour.minute} AM`;
    }
}


function _ExtractHourFromString(hour) {
    var hourRe = new RegExp('(\\d|\\d\\d):(\\d|\\d\\d) (AM|PM)');
    var match = hourRe.exec(hour);

    if (!match) {
        throw 'Invalid hour';
    }

    var hour = parseInt(match[1], 10);
    var minute = parseInt(match[2], 10);
    var amPm = match[3];

    if (isNaN(hour) || isNaN(minute)) {
        throw 'Invalid hour or minute';
    }

    if (amPm == 'PM') {
        hour += 12;
    }

    if (hour < 0 || hour > 23) {
        throw 'Out of bounds hour';
    }

    if (minute < 0 || minute > 59) {
        throw 'Out of bounds minute';
    }

    return {
        hour: hour,
        minute: minute
    };
}
