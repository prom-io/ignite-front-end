import {observable, action} from "mobx";
import {axiosInstance} from "../../api/axios-instance";

export class AuthorizationStore {
    @observable
    currentUser = undefined;

    @observable
    accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

    @observable
    fetchingCurrentUser = false;

    @action
    setAccessToken = accessToken => {
        localStorage.setItem("accessToken", accessToken);
        this.accessToken = accessToken;
        this.fetchCurrentUser();
    };
    
    @action
    setTempAccessToken = accessToken => {
        sessionStorage.setItem("accessToken", accessToken);
        this.accessToken = accessToken;
        this.fetchCurrentUser();
    };

    @action
    fetchCurrentUser = () => {
        if (localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")) {
            this.fetchingCurrentUser = true;
            axiosInstance.get("/api/v1/accounts/current")
                .then(({data}) => this.currentUser = data)
                .finally(() => this.fetchingCurrentUser = false);
        }
    };

    @action
    doLogout = () => {
        console.log("Doing logout");
        this.currentUser = undefined;
        this.accessToken = undefined;
        localStorage.removeItem("accessToken");

        //logout for Android webview
        console.log("Checking AndroidCallback presence");
        if (window.AndroidCallback) {
            console.log("AndroidCallback is present, doing logout for webview");
            window.AndroidCallback.logout();
        } else {
            console.log("AndroidCallback is not present");
        }
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
    };

    @action
    setCurrentUser = currentUser => {
        this.currentUser = currentUser;
    };
}
