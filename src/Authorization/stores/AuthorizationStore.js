import {observable, action} from "mobx";
import {axiosInstance} from "../../api/axios-instance";

export class AuthorizationStore {
    @observable
    currentUser = undefined;

    @observable
    accessToken = localStorage.getItem("accessToken");

    @action
    setAccessToken = accessToken => {
        localStorage.setItem("accessToken", accessToken);
        this.accessToken = accessToken;
        this.fetchCurrentUser();
    };

    @action
    fetchCurrentUser = () => {
        if (localStorage.getItem("accessToken")) {
            axiosInstance.get("/api/v1/accounts/current")
                .then(({data}) => this.currentUser = data);
        }
    }
}
