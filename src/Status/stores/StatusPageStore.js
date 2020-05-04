import {action, reaction, observable, toJS} from "mobx";
import {axiosInstance} from "../../api/axios-instance";

export class StatusPageStore {
    @observable
    status = undefined;

    @observable
    pending = false;

    @observable
    error = undefined;

    @observable
    statusLikePending = false;

    @observable
    statusAuthorSubscriptionPending = false;

    authorizationStore = undefined;
    createStatusStore = undefined;

    constructor(authorizationStore, createStatusStore) {
        this.authorizationStore = authorizationStore;
        this.createStatusStore = createStatusStore;

        reaction(
            () => this.createStatusStore.createdStatus,
            status => {
                if (this.status && status && status.referred_status && status.referred_status.id === this.status.id) {
                    if (status.status_reference_type === "REPOST") {
                        this.status = {
                            ...this.status,
                            reposts_count: this.status.reposts_count + 1
                        }
                    } else {
                        this.status = {
                            ...this.status,
                            comments_count: this.status.comments_count + 1
                        }
                    }
                }
            }
        )
    }

    @action
    fetchStatus = id => {
        this.pending = true;
        this.error = undefined;

        axiosInstance.get(`/api/v1/statuses/${id}`)
            .then(({data}) => this.status = data)
            .catch(error => this.error = error)
            .finally(() => this.pending = false)
    };

    @action
    favouriteStatus = () => {
        if (this.status && this.authorizationStore.accessToken) {
            axiosInstance.post(`/api/v1/statuses/${this.status.id}/favourite`)
                .then(({data}) => {
                    if (this.status && this.status.id === data.id) {
                        this.status = data;
                    }
                })
                .finally(() => this.statusLikePending = false)
        }
    };

    @action
    unfavouriteStatus = () => {
        if (this.status && this.authorizationStore.accessToken) {
            this.statusLikePending = true;
            axiosInstance.post(`/api/v1/statuses/${this.status.id}/unfavourite`)
                .then(({data}) => {
                    if (this.status && this.status.id === data.id) {
                        this.status = data;
                    }
                })
                .finally(() => this.statusLikePending = false)
        }
    };

    @action
    followStatusAuthor = () => {
        if (this.status && this.authorizationStore.accessToken) {
            this.statusAuthorSubscriptionPending = true;
            const statusId = this.status.id;
            axiosInstance.post(`/api/v1/accounts/${this.status.account.id}/follow`)
                .then(() => {
                    if (this.status.id === statusId) {
                        this.status.account.following = true;
                    }
                })
                .finally(() => this.statusAuthorSubscriptionPending = false)
        }
    };

    @action
    unfollowStatusAuthor = () => {
        if (this.status && this.authorizationStore.accessToken) {
            this.statusAuthorSubscriptionPending = true;
            const statusId = this.status.id;
            axiosInstance.post(`/api/v1/accounts/${this.status.account.id}/unfollow`)
                .then(() => {
                    if (this.status.id === statusId) {
                        this.status.account.following = false;
                    }
                })
                .finally(() => this.statusAuthorSubscriptionPending = false)
        }
    };

    @action
    increaseCommentsCount = statusId => {
        if (this.status && statusId === this.status.id) {
            this.status = {
                ...this.status,
                comments_count: this.status.comments_count + 1
            }
        }
    };

    @action
    reset = () => {
        this.status = undefined;
        this.error = undefined;
        this.pending = false;
    }
}
