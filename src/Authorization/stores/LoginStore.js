import {action, observable} from "mobx";
import {axiosInstance} from "../../api/axios-instance";

export class LoginStore {
    @observable
    loginForm = {
        username: "",
        password: ""
    };

    @observable
    submissionError = undefined;

    @observable
    pending = false;

    @observable
    loginDialogOpen = false;

    @action
    setFormValue = (key, value) => {
        this.loginForm[key] = value;
    };

    authorizationStore = undefined;
    genericAuthorizationDialogStore = undefined;

    constructor(authorizationStore, genericAuthorizationDialogStore) {
        this.authorizationStore = authorizationStore;
        this.genericAuthorizationDialogStore = genericAuthorizationDialogStore;
    }

    @action
    doLogin = (isRemember) => {
        this.submissionError = undefined;
        axiosInstance.post("/api/v3/auth/login", {...this.loginForm})
            .then(({data}) => {
                isRemember ? this.authorizationStore.setAccessToken(data.access_token) : this.authorizationStore.setTempAccessToken(data.access_token);
                this.loginForm = {
                    username: "",
                    password: ""
                };
                this.setLoginDialogOpen(false);
            })
            .catch(error => {
                this.submissionError = error;
                console.log(error);
            })
            .finally(() => this.pending = false);
    };

    @action
    setLoginDialogOpen = loginDialogOpen => {
        this.loginDialogOpen = loginDialogOpen;
        this.genericAuthorizationDialogStore.setGenericAuthorizationDialogOpen(false);
    };
}
