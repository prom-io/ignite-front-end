import { differenceInSeconds, formatDistance, formatDistanceStrict } from 'date-fns';

export const getCreatedAtLabel = (createdAt, dateFnsLocale, addSuffix = true) => {
    const now = new Date();

    if (Math.abs(differenceInSeconds(createdAt, now)) < 30) {
        return formatDistance(createdAt, now, {
            includeSeconds: true,
            locale: dateFnsLocale,
            addSuffix,
        });
    }
    return formatDistanceStrict(createdAt, now, {
        locale: dateFnsLocale,
        addSuffix,
    });
};
