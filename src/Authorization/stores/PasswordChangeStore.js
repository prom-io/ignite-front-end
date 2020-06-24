import { observable, action, reaction } from 'mobx';
import {
    validateEthereumAddress,
    validateEthereumPrivateKey,
    validatePassword,
    validatePasswordConfirmation
} from '../validation';
import {axiosInstance} from "../../api/axios-instance";

export class PasswordChangeStore {
    @observable
    passwordChangeForm = {
        password: '',
        passwordConfirmation: '',
        walletAddress: '',
        privateKey: ''
    };

    @observable
    formErrors = {
        password: undefined,
        passwordConfirmation: undefined,
        walletAddress: undefined,
        privateKey: undefined
    };

    @observable
    pending = false;

    @observable
    error = undefined;

    @observable
    showPassword = false;

    web3 = undefined;
    genericAuthorizationDialogStore = undefined;

    constructor(web3, genericAuthorizationDialogStore) {
        this.web3 = web3;
        this.genericAuthorizationDialogStore = genericAuthorizationDialogStore;

        reaction(
            () => this.passwordChangeForm.walletAddress,
            address => this.formErrors.address = validateEthereumAddress(address)
        );

        reaction(
            () => this.passwordChangeForm.privateKey,
            privateKey => {
                this.formErrors.walletAddress = validateEthereumAddress(this.passwordChangeForm.walletAddress);

                if (!this.formErrors.walletAddress) {
                    this.formErrors.privateKey = validateEthereumPrivateKey(
                        privateKey,
                        this.passwordChangeForm.walletAddress,
                        this.web3
                    );
                }
            }
        );

        reaction(
            () => this.passwordChangeForm.password,
            password => this.formErrors.password = validatePassword(password)
        );

        reaction(
            () => this.passwordChangeForm.passwordConfirmation,
            passwordConfirmation => {
                this.formErrors.password = validatePassword(this.passwordChangeForm.password);

                if (!this.formErrors.password) {
                    this.formErrors.passwordConfirmation = validatePasswordConfirmation(
                        passwordConfirmation,
                        this.passwordChangeForm.password
                    );
                }
            }
        )
    };

    @action
    setShowPassword = showPassword => {
        this.showPassword = showPassword;
    };

    @action
    setFormValue = (key, value) => {
        this.passwordChangeForm = {
            ...this.passwordChangeForm,
            [key]: value
        };
    };

    @action
    changePassword = () => {
        if (!this.validateForm()) {
            return;
        }

        this.pending = true;
        this.error = undefined;

        axiosInstance.put('/api/v1/accounts/password', {
            wallet_address: this.passwordChangeForm.walletAddress,
            private_key: this.passwordChangeForm.privateKey,
            password: this.passwordChangeForm.password,
            password_confirmation: this.passwordChangeForm.passwordConfirmation
        })
            .then(() => this.genericAuthorizationDialogStore.setGenericAuthorizationDialogType('passwordUpdated'))
            .catch(error => {
                this.error = error;
                this.genericAuthorizationDialogStore.setGenericAuthorizationDialogType('passwordUpdateError');
            })
            .finally(() => this.pending = false)
    };

    @action
    validateForm = () => {
        this.formErrors.walletAddress = validateEthereumAddress(this.passwordChangeForm.walletAddress);

        if (!this.formErrors.walletAddress) {
            this.formErrors.privateKey = validateEthereumPrivateKey(
                this.passwordChangeForm.privateKey,
                this.passwordChangeForm.walletAddress,
                this.web3
            );
        }

        this.formErrors.password = validatePassword(this.passwordChangeForm.password);

        if (!this.formErrors.password) {
            this.formErrors.passwordConfirmation = validatePasswordConfirmation(
                this.passwordChangeForm.password,
                this.passwordChangeForm.passwordConfirmation
            );
        }

        const { password, passwordConfirmation, walletAddress, privateKey } = this.formErrors;

        return !Boolean(password || passwordConfirmation || walletAddress || privateKey);
    };
}
