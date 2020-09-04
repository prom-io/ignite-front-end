import {
    format,
    differenceInSeconds,
    formatDistance,
    formatDistanceStrict
} from "date-fns";
import { format as tzFormat, utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

export const getCreatedAtLabel = (createdAt, dateFnsLocale, addSuffix = true) => {
    const now = new Date();

    if (Math.abs(differenceInSeconds(createdAt, now)) < 30) {
        return formatDistance(createdAt, now, {
            includeSeconds: true,
            locale: dateFnsLocale,
            addSuffix
        });
    }
    return formatDistanceStrict(createdAt, now, {
        locale: dateFnsLocale,
        addSuffix
    });
};

export const getTimeToCET = (date, pattern = "dd.MM.yyyy, HH:mm:ss") => {
    return tzFormat(utcToZonedTime(new Date(date), "Europe/Berlin"), pattern, {
        timeZone: "Europe/Berlin"
    });
};

export const getTimeWhenCETIsMidnight = () => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const cetTime = zonedTimeToUtc(
        new Date(format(new Date(), "MM/dd/yyyy")),
        "Europe/Berlin"
    );
    return tzFormat(utcToZonedTime(new Date(cetTime), timeZone), "HH:mm", {
        timeZone: timeZone
    });
};
