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
    fetchWhoToFollow = () => {
        this.pending = true;
        let language = localStorage.getItem("language");
        if (language !== "en" && language !== "kr") {
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
