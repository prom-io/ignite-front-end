import { action, observable } from "mobx";
import { axiosInstance } from "../../api/axios-instance";

export class FollowPeopleStore {
    @observable
    followPeopleItems = [];

    @observable
    followInputValue = "";

    @observable
    followResult = {
        type: "",
        username: ""
    };

    @observable
    pending = false;

    page = 1;

    authorizationStore = undefined;

    constructor(authorizationStore) {
        this.authorizationStore = authorizationStore;
    }

    @action
    setFollowInputValue = value => {
        this.followInputValue = value;
    };

    @action
    doFollow = () => {
        axiosInstance
            .post(`/api/v1/accounts/${this.followInputValue}/follow`)
            .then(({ data }) => {
                this.followInputValue = "";
                this.followResult = {
                    type: "success",
                    username: data.username
                };
                this.authorizationStore.currentUser.follows_count += 1;

                const temp = [...this.followPeopleItems];
                const selected = temp.find(item => item.id === data.id);
                const index = temp.indexOf(selected);
                const selectedUser = temp[index];
                selectedUser.following = true;
                this.followPeopleItems = [...temp];
                this.followPeopleItems.splice(
                    0,
                    0,
                    this.followPeopleItems.splice(index, 1)[0]
                );
            })
            .catch(err => {
                if (err.response.status == 409) {
                    this.followResult.type = "already";
                } else {
                    this.followResult.type = "error";
                }
            });
    };

    @action
    followWithButton = user => {
        if (user.following || user.followingForBtn) {
            axiosInstance
                .post(`/api/v1/accounts/${user.id}/unfollow`)
                .then(() => {
                    user.following = false;
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
    fetchFollowPeople = () => {
        this.pending = true;
        let language = localStorage.getItem("language");
        if (language !== "en" && language !== "ko") {
            language = "en";
        }
        axiosInstance
            .get(
                `/api/v1/accounts/follow-recommendations?language=${language}&page=${this.page}`
            )
            .then(({ data }) => {
                this.followPeopleItems.push(...data);
                this.page++;
            })
            .catch(error => (this.error = error))
            .finally(() => (this.pending = false));
    };

    @action
    reset = () => {
        this.followPeopleItems = [];
        this.followInputValue = "";
        this.followResult = {
            type: "",
            username: ""
        };
        this.pending = false;
        this.page = 1;
    };
}
