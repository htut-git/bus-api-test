// helpers/dateTimeHelper.mjs

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);

const MYANMAR_TIMEZONE = 'Asia/Yangon';

export function convertMyanmarToUTC(localDateTime, format = 'YYYY-MM-DD HH:mm') {
    return dayjs.tz(localDateTime, format, MYANMAR_TIMEZONE)
                .utc()
                .toISOString();
}

export function addDurationToDepartureTime(departureTime, duration) {
    const hoursToAdd = getDurationInHours(duration);
    
    return dayjs(departureTime)
        .add(hoursToAdd, 'hour')
        .utc()
        .toISOString(); // Return the updated UTC time
}

export function getDurationInHours(duration) {
    const regex = /(\d+) hours/;
    const match = duration.match(regex);
    if (match && match[1]) {
        return parseInt(match[1], 10);
    }
    return 0;
}
