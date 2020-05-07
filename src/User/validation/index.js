import {isStringEmpty} from "../../utils/string-utils";

const USERNAME_REGEXP = /^[a-zA-Z0-9]+$/;

export const validateUsername = username => {
    if (isStringEmpty(username)) {
        return "user.username.cant-be-empty";
    }

    if (username.length > 30) {
        return "user.username.is-too-long";
    }

    if (!USERNAME_REGEXP.test(username)) {
        return "user.username.contains-invalid-characters";
    }

    return undefined;
};

export const validateDisplayName = displayName => {
    if (!displayName) {
        return undefined;
    }

    if (displayName.length > 50) {
        return "user.display-name.is-too-long";
    }

    return undefined;
};

export const validateBio = bio => {
    if (!bio) {
        return undefined;
    }

    if (bio.length > 400) {
        return "user.bio.is-too-long";
    }

    return undefined;
};
