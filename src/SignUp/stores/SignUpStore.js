import {action, computed, observable, reaction} from "mobx";
import {validateEmail} from "../validation";
import {axiosInstance} from "../../api/axios-instance";

export class SignUpStore {
    @observable
    signUpForm = {
        email: ""
    };

    @observable
    signUpFormErrors = {
        email: undefined
    };

    @observable
    pending = false;

    @observable
    submissionError = false;

    @observable
    showSnackbar = false;

    @observable
    signUpDialogOpen = false;

    authorizationStore = undefined;
    web3 = undefined;

    @computed
    get currentUser() {
        return this.authorizationStore.currentUser;
    }

    constructor(authorizationStore, web3) {
        this.authorizationStore = authorizationStore;
        this.web3 = web3;

        reaction(
            () => this.signUpForm.email,
            email => this.signUpFormErrors.email = validateEmail(email)
        );

        reaction(
            () => this.currentUser,
            user => {
                if (user) {
                    this.reset();
                }
            }
        )
    }

    @action
    setFormValue = (key, value) => {
        this.signUpForm[key] = value;
    };

    @action
    setSignUpDialogOpen = signUpDialogOpen => {
        this.signUpDialogOpen = signUpDialogOpen;
    };

    @action
    setShowSnackbar = showSnackbar => {
        this.showSnackbar = showSnackbar;
    };

    @action
    signUp = () => {
        if (this.validateForm()) {
            this.pending = true;

            axiosInstance.post("/api/v1/accounts/private-beta", {...this.signUpForm})
                .then(() => this.showSnackbar = true)
                .catch(error => {
                    this.submissionError = error;
                    this.showSnackbar = true;
                })
                .finally(() => this.pending = false);
        }
    };

    @action
    validateForm = () => {
        this.signUpFormErrors.email = validateEmail(this.signUpForm.email);

        const {email} = this.signUpFormErrors;

        return !Boolean(email);
    };

    @action
    reset = () => {
        this.signUpForm = {
            email: ""
        };
        this.pending = false;
        this.submissionError = undefined;
        setTimeout(() => {
            this.signUpFormErrors = {
                email: undefined,
            };
        })
    }
}
