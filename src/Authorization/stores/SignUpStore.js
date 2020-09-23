import {action, observable, computed, reaction} from "mobx";
import {validatePassword, validatePasswordConfirmation} from "../validation";
import {axiosInstance} from "../../api/axios-instance";

export class SignUpStore {
    @observable
    signUpForm = {
        password: '',
        passwordConfirmation: '',
        type: 'user',
    };
    
    @observable
    signUpCommunityForm = {
        displayName: '',
        username: '',
        about: '',
        avatar: undefined,
    };

    @observable
    formErrors = {
        password: undefined,
        passwordConfirmation: undefined,
        username: undefined,
        displayName: undefined,
        about: undefined,
    };

    @observable
    showPassword = false;

    @observable
    pending = false;

    @observable
    submissionError = undefined;

    @observable
    referenceId = undefined;

    @observable
    captchaToken = undefined;

    generateWalletStore = undefined;
    genericAuthorizationDialogStore = undefined;
    localeStore = undefined;

    @computed
    get generatedWallet() {
        return this.generateWalletStore.generatedWallet;
    }

    constructor(generateWalletStore, genericAuthorizationDialogStore, localeStore) {
        this.generateWalletStore = generateWalletStore;
        this.genericAuthorizationDialogStore = genericAuthorizationDialogStore;
        this.localeStore = localeStore;

        reaction(
            () => this.signUpForm.password,
            password => {
                this.formErrors.password = validatePassword(password);
                this.formErrors.passwordConfirmation = validatePasswordConfirmation(
                    this.signUpForm.passwordConfirmation,
                    password
                );
            }
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
    setCommunityFormValue = (key, value) => {
        this.signUpCommunityForm = {
            ...this.signUpCommunityForm,
            [key]: value
        }
    };

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
    setReferenceId = referenceId => {
        this.referenceId = referenceId;
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
            private_key: this.generatedWallet.privateKey,
            language: this.localeStore.selectedLanguage || 'en',
            reference_id: this.referenceId,
        }, { 
            headers: { 
                "x-recaptcha": this.captchaToken
            } 
        })
            .then(() => this.genericAuthorizationDialogStore.setGenericAuthorizationDialogTempType('attention'))
            .catch(error => {
                this.submissionError = error;
                this.genericAuthorizationDialogStore.setGenericAuthorizationDialogTempType('attention');
            })
            .finally(() => {
                this.referenceId = undefined;
                this.pending = false;
            })
    };

    @action
    validateForm = () => {
        this.formErrors = {
            ...this.formErrors,
            password: validatePassword(this.signUpForm.password)
        };

        if (!this.formErrors.password) {
            this.formErrors = {
                ...this.formErrors,
                passwordConfirmation: validatePasswordConfirmation(
                    this.signUpForm.passwordConfirmation,
                    this.signUpForm.password
                )
            };
        }

        const {password, passwordConfirmation} = this.formErrors;

        return !Boolean(password || passwordConfirmation);
    }

    @action
    setCaptchaToken = captchaToken => {
        this.captchaToken = captchaToken;
    }
}
