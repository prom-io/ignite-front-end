import {action, observable, computed, reaction} from "mobx";
import {validatePassword, validatePasswordConfirmation} from "../validation";
import {axiosInstance} from "../../api/axios-instance";

export class SignUpStore {
    @observable
    signUpForm = {
        password: '',
        passwordConfirmation: ''
    };

    @observable
    formErrors = {
        password: undefined,
        passwordConfirmation: undefined
    };

    @observable
    showPassword = false;

    @observable
    pending = false;

    @observable
    submissionError = undefined;

    generateWalletStore = undefined;
    genericAuthorizationDialogStore = undefined;

    @computed
    get generatedWallet() {
        return this.generateWalletStore.generatedWallet;
    }

    constructor(generateWalletStore, genericAuthorizationDialogStore) {
        this.generateWalletStore = generateWalletStore;
        this.genericAuthorizationDialogStore = genericAuthorizationDialogStore;

        reaction(
            () => this.signUpForm.password,
            password => this.formErrors.password = validatePassword(password)
        );

        reaction(
            () => this.signUpForm.passwordConfirmation,
            passwordConfirmation => this.formErrors.passwordConfirmation = validatePasswordConfirmation(
                passwordConfirmation,
                this.signUpForm.password
            )
        );
    }

    @action
    setFormValue = (key, value) => {
        this.signUpForm = {
            ...this.signUpForm,
            [key]: value
        }
    };

    @action
    setShowPassword = showPassword => {
        this.showPassword = showPassword;
    };

    @action
    doSignUp = () => {
        if (!this.validateForm()) {
            return;
        }

        this.pending = true;
        this.submissionError = undefined;

        axiosInstance.post('/api/v1/sign-up', {
            password: this.signUpForm.password,
            password_confirmation: this.signUpForm.passwordConfirmation,
            wallet_address: this.generatedWallet.address,
            private_key: this.generatedWallet.privateKey
        })
            .then(() => this.genericAuthorizationDialogStore.setGenericAuthorizationDialogType('attention'))
            .catch(error => {
                this.submissionError = error;
                this.genericAuthorizationDialogStore.setGenericAuthorizationDialogType('attention');
            })
            .finally(() => this.pending = false)
    };

    @action
    validateForm = () => {
        this.formErrors.password = validatePassword(this.signUpForm.password);

        if (!this.formErrors.password) {
            this.formErrors.passwordConfirmation = validatePasswordConfirmation(
                this.formErrors.passwordConfirmation,
                this.formErrors.password
            )
        }

        const {password, passwordConfirmation} = this.formErrors;

        return !Boolean(password || passwordConfirmation);
    }
}