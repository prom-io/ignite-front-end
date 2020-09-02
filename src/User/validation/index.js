import { isStringEmpty } from "../../utils/string-utils";

const USERNAME_REGEXP = /^[a-z0-9!?\\|\-_\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7AF\uD7B0-\uD7FF\u4e00-\u9eff]+$/;

export const validateUsername = username => {
    if (isStringEmpty(username)) {
        return "user.username.cant-be-empty";
    }

    if (username.length > 50) {
        return "user.username.is-too-long";
    }

    if (username !== username.toLowerCase()) {
        return "user.username.contains-uppercase";
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

    if (bio.length > 160) {
        return "user.bio.is-too-long";
    }

    return undefined;
};

export const validateExternalUrl = externalUrl => {
    if (!externalUrl) {
        return undefined;
    }

    if (externalUrl.length > 100) {
        return "user.external-url.is-too-long";
    }

    return undefined;
};
