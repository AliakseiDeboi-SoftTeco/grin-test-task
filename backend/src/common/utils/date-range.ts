import { startOfToday, subDays } from 'date-fns';
import { RangeEnum } from '../enums/range.enum';

export function getDateInterval(range: RangeEnum) {
    const now = new Date();
    switch (range) {
        case RangeEnum.TODAY:
            return { start: startOfToday(), end: now };
        case RangeEnum.SEVEN_DAYS:
            return { start: subDays(now, 7), end: now };
        case RangeEnum.THIRTY_DAYS:
            return { start: subDays(now, 30), end: now };
        default:
            return { start: new Date(0), end: now };
    }
}
