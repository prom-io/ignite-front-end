export const isStringEmpty = string => !(string && string.trim().length !== 0);

export const addLineBreak = (string, position = 21) => string.slice(0, position) + " " + string.slice(21);
