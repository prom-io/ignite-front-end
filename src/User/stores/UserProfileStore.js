import {observable, action, reaction} from "mobx";
import {axiosInstance} from "../../api/axios-instance";

export class UserProfileStore {
    @observable
    user = undefined;

    @observable
    fetchingUser = false;

    @observable
    fetchingRelationships = false;

    @observable
    username = undefined;

    @observable
    error = undefined;

    @observable
    relationShips = undefined;

    @observable
    activeTab = "posts";

    authorizationStore = undefined;
    userStatusesStore = undefined;
    userFollowersStore = undefined;
    userFollowingStore = undefined;

    constructor(authorizationStore, userStatusesStore, userFollowersStore, userFollowingStore) {
        this.authorizationStore = authorizationStore;
        this.userStatusesStore = userStatusesStore;
        this.userFollowersStore = userFollowersStore;
        this.userFollowingStore = userFollowingStore;

        reaction(
            () => this.user,
            user => {
                if (user) {
                    this.userStatusesStore.setBaseUrl(`/api/v1/accounts/${user.id}/statuses`);
                    this.userStatusesStore.fetchStatuses();
                }
            }
        )
    }

    @action
    fetchUserByUsername = username => {
        this.fetchingUser = true;
        this.error = undefined;
        this.username = username;

        axiosInstance.get(`/api/v1/account_by_username/${username}`)
            .then(({data}) => {
                this.user = data;
                this.fetchRelationships();
            })
            .catch(error => this.error = error)
            .finally(() => this.fetchingUser = false)
    };

    @action
    fetchRelationships = () => {
        if (this.user && this.authorizationStore.accessToken) {
            this.fetchingRelationships = true;
            axiosInstance.get(`/api/v1/relationship?id[]=${this.user.id}`)
                .then(({data}) => this.relationShips = data)
                .finally(() => this.fetchingRelationships = false)
        }
    };

    @action
    setActiveTab = tab => {
        console.log(`Setting active tab ${tab}`)
        this.activeTab = tab;

        switch (this.activeTab) {
            case "posts":
                if (this.userStatusesStore.statuses.length === 0) {
                    this.userStatusesStore.fetchStatuses();
                }
                break;
            case "followers":
                if (this.user && this.user.followers !== 0) {
                    this.userFollowersStore.fetchUserFollowers(this.username);
                }
                break;
            case "following":
                if (this.user && this.user.following !== 0) {
                    this.userFollowingStore.fetchFollowing(this.username);
                }
                break;
            default:
                break;
        }
    };

    @action
    followUser = () => {
        axiosInstance.post(`/api/v1/accounts/${this.user.username}/follow`)
            .then(({data}) => this.relationShips = data);
    };

    @action
    unfollowUser = () => {
        axiosInstance.post(`/api/v1/accounts/${this.user.username}/unfollow`)
            .then(({data}) => this.relationShips = data);
    };

    @action
    reset = () => {
        this.username = undefined;
        this.user = undefined;
        this.pending = false;
        this.error = undefined;
        this.userFollowingStore.reset();
        this.userFollowersStore.reset();
    }
}
