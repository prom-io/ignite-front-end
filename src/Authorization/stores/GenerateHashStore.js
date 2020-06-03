import { observable, action, reaction } from 'mobx';
import { validatePassword, validatePasswordConfirmation } from '../validation';
import { axiosInstance } from '../../api/axios-instance';

export class GenerateHashStore {
    @observable
    passwordForm = {
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
    generatedHash = undefined;

    @observable
    error = undefined;

    @observable
    pending = false;

    constructor() {
        reaction(
            () => this.passwordForm.password,
            password => this.formErrors.password = validatePassword(password)
        );

        reaction(
            () => this.passwordForm.passwordConfirmation,
            passwordConfirmation => {
                this.formErrors.passwordConfirmation = validatePasswordConfirmation(
                    passwordConfirmation,
                    this.passwordForm.password
                );
                if (this.validateForm()) {
                    this.generateHash();
                }
            }
        )
    }

    @action
    setShowPassword = showPassword => {
        this.showPassword = showPassword;
    };

    @action
    setFormValue = (key, value) => {
        this.passwordForm = {
            ...this.passwordForm,
            [key]: value
        };
    };

    @action
    generateHash = () => {
        if (!this.validateForm()) {
            return;
        }

        this.pending = false;
        this.error = undefined;

        axiosInstance.post("/api/v1/password-hash", {
            password: this.passwordForm.password
        })
            .then(({data}) => this.generatedHash = data.password_hash)
            .catch(error => this.error = error)
            .finally(() => this.pending = false);
    };

    @action
    validateForm = () => {
        this.formErrors.password = validatePassword(this.passwordForm.password);

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
