import { differenceInSeconds, formatDistance, formatDistanceStrict } from "date-fns";
import { format as tzFormat, utcToZonedTime } from "date-fns-tz";

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

export const getTimeToEST = (date, pattern = "dd.MM.yyyy, HH:mm:ss") => {
    return tzFormat(utcToZonedTime(new Date(date), "America/New_York"), pattern, {
        timeZone: "America/New_York"
    });
};
