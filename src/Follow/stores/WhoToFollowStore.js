import { action, observable } from "mobx";
import { axiosInstance } from "../../api/axios-instance";

export class WhoToFollowStore {
    @observable
    whoToFollowItems = [];

    @observable
    pending = false;

    authorizationStore = undefined;

    constructor(authorizationStore) {
        this.authorizationStore = authorizationStore;
    }

    @action
    followWithButton = user => {
        if (user.following || user.followingForBtn) {
            axiosInstance
                .post(`/api/v1/accounts/${user.id}/unfollow`)
                .then(() => {
                    user.followingForBtn = false;
                    this.authorizationStore.currentUser.follows_count -= 1;
                })
                .catch(error => (this.error = error));
        } else {
            axiosInstance
                .post(`/api/v1/accounts/${user.id}/follow`)
                .then(() => {
                    user.followingForBtn = true;
                    this.authorizationStore.currentUser.follows_count += 1;
                })
                .catch(error => (this.error = error));
        }
    };

    @action
    fetchWhoToFollow = () => {
        this.pending = true;
        let language = localStorage.getItem("language");
        if (language !== "en" && language !== "ko") {
            language = "en";
        }
        axiosInstance
            .get(
                `/api/v1/accounts/follow-recommendations?language=${language}&page=1`
            )
            .then(({ data }) => {
                this.whoToFollowItems = [...data];
            })
            .catch(error => (this.error = error))
            .finally(() => (this.pending = false));
    };

    @action
    reset = () => {
        this.whoToFollowItems = [];
        this.pending = false;
    };
}
