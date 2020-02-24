import {observable, action} from "mobx";
import {axiosInstance} from "../../api/axios-instance";

export class AuthorizationStore {
    @observable
    currentUser = undefined;

    @observable
    accessToken = localStorage.getItem("accessToken");

    @observable
    fetchingCurrentUser = false;

    @action
    setAccessToken = accessToken => {
        localStorage.setItem("accessToken", accessToken);
        this.accessToken = accessToken;
        this.fetchCurrentUser();
    };

    @action
    fetchCurrentUser = () => {
        if (localStorage.getItem("accessToken")) {
            this.fetchingCurrentUser = true;
            axiosInstance.get("/api/v1/accounts/current")
                .then(({data}) => this.currentUser = data)
                .finally(() => this.fetchingCurrentUser = false);
        }
    };

    @action
    doLogout = () => {
        this.currentUser = undefined;
        localStorage.removeItem("accessToken");
    };

    @action
    setStatusesCount = statuses => {
        if (this.currentUser) {
            this.currentUser.statuses_count = statuses;
        }
    };

    @action
    setFollowersCount = followersCount => {
        if (this.currentUser) {
            this.currentUser.followers_count = followersCount;
        }
    };

    @action
    setFollowsCount = followsCount => {
        if (this.currentUser) {
            this.currentUser.follows_count = followsCount;
        }
    }
}
