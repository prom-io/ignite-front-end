import {observable, action, reaction, computed} from "mobx";
import {validateEthereumAddress, validatePrivateKey} from "../validation";
import {axiosInstance} from "../../api/axios-instance";

export class SignUpStore {
    @observable
    signUpForm = {
        address: "",
        privateKey: "",
        username: undefined
    };

    @observable
    signUpFormErrors = {
        address: undefined,
        privateKey: undefined,
        username: undefined
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
            () => this.signUpForm.address,
            address => this.signUpFormErrors.address = validateEthereumAddress(address)
        );

        reaction(
            () => this.signUpFormErrors.privateKey,
            privateKey => {
                this.signUpFormErrors.address = validateEthereumAddress(this.signUpForm.address);

                if (!this.signUpFormErrors.address) {
                    console.log(this.web3);
                    this.signUpFormErrors.privateKey = validatePrivateKey(this.signUpForm.address, this.web3, privateKey);
                }
            }
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

            axiosInstance.post("/api/v3/accounts", {...this.signUpForm})
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
        this.signUpFormErrors.address = validateEthereumAddress(this.signUpForm.address);
        this.signUpFormErrors.privateKey = validatePrivateKey(this.signUpForm.address, this.web3, this.signUpForm.privateKey);

        const {address, privateKey} = this.signUpFormErrors;

        return !Boolean(address || privateKey);
    };

    @action
    reset = () => {
        this.signUpForm = {
            address: "",
            privateKey: ""
        };
        this.pending = false;
        this.submissionError = undefined;
        setTimeout(() => {
            this.signUpFormErrors = {
                address: undefined,
                privateKey: undefined
            };
        })
    }
}
