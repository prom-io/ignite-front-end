import {action, observable} from "mobx";
import {axiosInstance} from "../../api/axios-instance";
import {isStringEmpty} from "../../utils/string-utils";

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

    @action
    setFormValue = (key, value) => {
        this.loginForm[key] = value;
    };

    authorizationStore = undefined;

    constructor(authorizationStore) {
        this.authorizationStore = authorizationStore;
    }

    @action
    doLogin = () => {
        if (!isStringEmpty(this.loginForm.username) || !isStringEmpty(this.loginForm.password)) {
            axiosInstance.post("/api/v3/auth/login", {...this.loginForm})
                .then(({data}) => {
                    this.authorizationStore.setAccessToken(data.access_token);
                    this.loginForm = {
                        username: "",
                        password: ""
                    };
                })
        }
    }
}
