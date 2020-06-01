import { isStringEmpty } from '../../utils/string-utils';

const PASSWORD_REGEXP = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#\$%\^&\*])(?=.{8,})');

export const validatePassword = password => {
    if (isStringEmpty(password)) {
        return 'sign-up.password.empty';
    }

    if (password.length < 8) {
        return 'sign-up.password.not-strong';
    }

    if (!PASSWORD_REGEXP.test(password)) {
        return 'sign-up.password.not-strong';
    }

    return undefined;
};

export const validatePasswordConfirmation = (passwordConfirmation, password) => {
    if (passwordConfirmation !== password) {
        return 'sign-up.password.mismatch';
    }

    return undefined;
};
