import { observable, action, reaction } from "mobx";
import { axiosInstance } from "../../api/axios-instance";
import { store } from "../../store";

export class AuthorizationStore {
    @observable
    currentUser = undefined;

    @observable
    accessToken =
        localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

    @observable
    fetchingCurrentUser = false;

    createStatusStore = undefined;

    constructor(createStatusStore) {
        this.createStatusStore = createStatusStore;

        reaction(
            () => this.createStatusStore.createdStatus,
            createdStatus => {
                if (createdStatus) {
                    this.setStatusesCount(this.currentUser.statuses_count + 1);
                }
            }
        );
    }

    @action
    setAccessToken = accessToken => {
        localStorage.setItem("accessToken", accessToken);
        this.accessToken = accessToken;
        this.fetchCurrentUser(true);
    };

    @action
    setTempAccessToken = accessToken => {
        sessionStorage.setItem("accessToken", accessToken);
        this.accessToken = accessToken;
        this.fetchCurrentUser(true);
    };

    @action
    fetchCurrentUser = isRedirect => {
        if (
            localStorage.getItem("accessToken") ||
            sessionStorage.getItem("accessToken")
        ) {
            this.fetchingCurrentUser = true;
            axiosInstance
                .get("/api/v1/accounts/current")
                .then(({ data }) => {
                    this.currentUser = data;
                    if (isRedirect && (!data.avatar || data.id == data.username)) {
                        window.location.pathname = "/edit-profile";
                    }
                })
                .finally(() => (this.fetchingCurrentUser = false));
        }
    };

    @action
    updateBalance = () => {
        if (
            localStorage.getItem("accessToken") ||
            sessionStorage.getItem("accessToken")
        ) {
            axiosInstance.get("/api/v1/accounts/current").then(({ data }) => {
                this.currentUser = data;
            });
        }
    };

    @action
    doLogout = () => {
        this.currentUser = undefined;
        this.accessToken = undefined;
        localStorage.removeItem("accessToken");
        sessionStorage.removeItem("accessToken");
        store.timelineSwitcher.setCurrentTimeline("global");

        if (window.AndroidCallback) {
            window.AndroidCallback.logout();
        } else {
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
