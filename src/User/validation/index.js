import { isStringEmpty } from '../../utils/string-utils';

const USERNAME_REGEXP = /^[a-zA-Z0-9\u3130-\u318F\uAC00-\uD7AF\u4E00-\u9FFF\u3400-\u4DBF\u20000-\u2A6DF\u2A700-\u2B73F\u2B740-\u2B81F\u2B820-\u2CEAF\uF900-\uFAFF\u2F800-\u2FA1F_]+$/;
const PASSWORD_REGEXP = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#\$%\^&\*])(?=.{8,})');

export const validateUsername = username => {
    if (isStringEmpty(username)) {
        return 'user.username.cant-be-empty';
    }

    if (username.length > 50) {
        return 'user.username.is-too-long';
    }

    if (!USERNAME_REGEXP.test(username)) {
        return 'user.username.contains-invalid-characters';
    }

    return undefined;
};

export const validateDisplayName = displayName => {
    if (!displayName) {
        return undefined;
    }

    if (displayName.length > 50) {
        return 'user.display-name.is-too-long';
    }

    return undefined;
};

export const validateBio = bio => {
    if (!bio) {
        return undefined;
    }

    if (bio.length > 160) {
        return 'user.bio.is-too-long';
    }

    return undefined;
};

export const validateIsCurrentPassword = (currentPassword, password) => {
    if (isStringEmpty(password)) {
        return 'user.change-password.empty';
    }

    if (currentPassword !== password) {
        return 'user.change-password.mismatch';
    }

    return undefined;
}

export const validatePassword = password => {
    if (isStringEmpty(password)) {
        return 'user.change-password.empty';
    }

    if (password.length < 8) {
        return 'user.change-password.not-strong';
    }

    if (!PASSWORD_REGEXP.test(password)) {
        return 'user.change-password.not-strong';
    }

    return undefined;
}
