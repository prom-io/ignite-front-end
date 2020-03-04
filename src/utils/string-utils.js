export const isStringEmpty = string => !(string && string.trim().length !== 0);

export const addLineBreak = (string, position = 21) => string.slice(0, position) + " " + string.slice(21);

export const trimString = (string, position) => {
    if (string.length >= position) {
        string = string.slice(0, position - 3) + "...";
    }

    return string;
};
