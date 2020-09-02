import { isStringEmpty } from '../../utils/string-utils';

const PASSWORD_REGEXP = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!$%^&*()_+|~\\-=`{}[\\]:;<>?,.\\/])(?=.{8,})');
const ETHEREUM_ADDRESS_REGEXP = new RegExp('^0x[a-fA-F0-9]{40}$');

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

export const validateEthereumAddress = address => {
    if (isStringEmpty(address)) {
        return 'password-change.address.empty';
    }

    if (!ETHEREUM_ADDRESS_REGEXP.test(address)) {
        return 'password-change.address.invalid';
    }

    return undefined;
};

export const validateEthereumPrivateKey = (privateKey, address, web3) => {
    let privateKeyCopy = privateKey;

    if (isStringEmpty(privateKeyCopy)) {
        return 'password-change.private-key.empty';
    }

    if (!privateKeyCopy.startsWith('0x')) {
        privateKeyCopy = `0x${privateKeyCopy}`;
    }

    const wallet = web3.eth.accounts.privateKeyToAccount(privateKeyCopy);

    if (wallet.address !== address) {
        return 'password-change.private-key.invalid';
    }

    return undefined;
};
