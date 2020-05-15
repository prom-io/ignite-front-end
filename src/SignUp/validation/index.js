import { isStringEmpty } from '../../utils/string-utils';

const ETHEREUM_ADDRESS_REGEXP = new RegExp('^0x[a-fA-F0-9]{40}$');
const EMAIL_REGEXP = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const validateEthereumAddress = (address, acceptEmpty) => {
    if (isStringEmpty(address) && !acceptEmpty) {
        return 'Address must be specified';
    }

    if (!ETHEREUM_ADDRESS_REGEXP.test(address)) {
        return 'Invalid Ethereum address';
    }

    return undefined;
};

export const validatePrivateKey = (address, web3Instance, privateKey) => {
    if (isStringEmpty(privateKey)) {
        return 'Private key is required';
    }

    try {
        const addressFromPrivateKey = web3Instance.eth.accounts.privateKeyToAccount(privateKey).address;

        if (addressFromPrivateKey !== address) {
            return 'Invalid private key';
        }
    } catch (error) {
        return 'Invalid private key';
    }

    return undefined;
};

export const validateEmail = email => {
    if (isStringEmpty(email)) {
        return 'Email is required';
    }

    if (!EMAIL_REGEXP.test(email)) {
        return 'Invalid email';
    }

    return undefined;
};
