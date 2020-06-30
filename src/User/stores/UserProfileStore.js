import {observable, action, reaction, toJS} from "mobx";
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
    activeTab = "posts";

    authorizationStore = undefined;
    userStatusesStore = undefined;
    userFollowersStore = undefined;
    userFollowingStore = undefined;
    createStatusStore = undefined;

    constructor(authorizationStore, userStatusesStore, userFollowersStore, userFollowingStore, createStatusStore) {
        this.authorizationStore = authorizationStore;
        this.userStatusesStore = userStatusesStore;
        this.userFollowersStore = userFollowersStore;
        this.userFollowingStore = userFollowingStore;
        this.createStatusStore = createStatusStore;

        reaction(
            () => this.user,
            user => {
                if (user) {
                    this.userStatusesStore.setBaseUrl(`/api/v1/accounts/${user.id}/statuses`);
                    this.userStatusesStore.fetchStatuses();
                }
            }
        );

        reaction(
            () => this.createStatusStore.createdStatus,
            createdStatus => {
                if (createdStatus && this.user && this.user.id === createdStatus.account.id) {
                    this.setStatusesCount(this.user.statuses_count + 1);
                }
            }
        );
    }

    @action
    setUser = user => {
        this.user = user;
    };

    @action
    fetchUserByUsername = username => {
        this.fetchingUser = true;
        this.error = undefined;
        this.username = username;

        axiosInstance.get(`/api/v1/account_by_username/${username}`)
            .then(({data}) => this.user = data)
            .catch(error => this.error = error)
            .finally(() => this.fetchingUser = false)
    };

    @action
    setActiveTab = tab => {
        this.activeTab = tab;

        switch (this.activeTab) {
            case "posts":
                if (this.userStatusesStore.statuses.length === 0) {
                    this.userStatusesStore.fetchStatuses();
                }
                break;
            case "followers":
                if (this.user && this.user.followers !== 0) {
                    this.userFollowersStore.fetchUserFollowers(this.user.id);
                }
                break;
            case "following":
                if (this.user && this.user.following !== 0) {
                    this.userFollowingStore.fetchFollowing(this.user.id);
                }
                break;
            default:
                break;
        }
    };

    @action
    followUser = () => {
        axiosInstance.post(`/api/v1/accounts/${this.user.id}/follow`)
            .then(() => {
                this.user.following = true;
                this.user.followers_count += 1;
                this.userStatusesStore.followStatusAuthorByAuthorId(this.user.id);
                this.authorizationStore.setFollowsCount(this.authorizationStore.currentUser.follows_count + 1);
            });
    };

    @action
    unfollowUser = () => {
        axiosInstance.post(`/api/v1/accounts/${this.user.id}/unfollow`)
            .then(() => {
                this.user.following = false;
                this.user.followers_count -= 1;
                this.userStatusesStore.unfollowStatusAuthorByAuthorId(this.user.id);
                this.authorizationStore.setFollowsCount(this.authorizationStore.currentUser.follows_count - 1);
            });
    };

    @action
    setFollowersCount = followersCount => {
        if (this.user) {
            this.user.followers_count = followersCount;
        }
    };

    @action
    setStatusesCount = statusesCount => {
        if (this.user) {
            this.user.statuses_count = statusesCount
        }
    };

    @action
    setFollowedByCurrentUser = followedByCurrentUser => {
        if (this.user) {
            this.user.following = followedByCurrentUser;

            if (followedByCurrentUser) {
                this.user.followers_count += 1;
            } else {
                this.user.followers_count -= 1;
            }
        }
    };

    @action
    reset = () => {
        this.userStatusesStore.reset();
        this.username = undefined;
        this.user = undefined;
        this.pending = false;
        this.error = undefined;
        this.activeTab = "posts";
        this.userFollowingStore.reset();
        this.userFollowersStore.reset();
    }
}
