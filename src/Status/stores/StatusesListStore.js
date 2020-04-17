import {action, computed, observable, reaction} from "mobx";
import _ from "lodash";
import {axiosInstance} from "../../api/axios-instance";

export class StatusesListStore {
    @observable
    statuses = [];

    @observable
    pending = false;

    @observable
    baseUrl = undefined;

    @observable
    statusLikePendingMap = {};

    authorizationStore = undefined;
    createStatusStore = undefined;

    statusAuthorSubscriptionListeners = [];
    statusAuthorUnsubscriptionListeners = [];

    @computed
    get createdStatus() {
        return this.createStatusStore.createdStatus;
    }

    constructor(authorizationStore, createStatusStore, baseUrl) {
        this.authorizationStore = authorizationStore;
        this.createStatusStore = createStatusStore;
        this.baseUrl = baseUrl;

        this.fetchStatuses = _.throttle(this.fetchStatuses, 5000);

        reaction(
            () => this.authorizationStore.accessToken,
            () => {
                this.statuses = [];
                this.fetchStatuses();
            }
        );

        reaction(
            () => this.createdStatus,
            status => {
                if (status) {
                    this.statuses = [
                        status,
                        ...this.statuses
                    ];
                    if (status.reposted_status) {
                        this.increaseRepostsCount(status.reposted_status.id)
                    }
                }
            }
        )
    }

    @action
    fetchStatuses = () => {
        this.pending = true;

        if (this.baseUrl) {
            if (this.statuses.length !== 0) {
                const maxId = this.statuses[this.statuses.length - 1].id;
                axiosInstance.get(`${this.baseUrl}?max_id=${maxId}`)
                    .then(({data}) => this.statuses.push(...data))
                    .finally(() => this.pending = false);
            } else {
                axiosInstance.get(`${this.baseUrl}`)
                    .then(({data}) => this.statuses.push(...data))
                    .finally(() => this.pending = false)
            }
        }
    };

    @action
    favouriteStatus = id => {
        if (this.authorizationStore.accessToken) {
            this.statusLikePendingMap = {
                ...this.statusLikePendingMap,
                [id]: true
            };
            axiosInstance.post(`/api/v1/statuses/${id}/favourite`)
                .then(({data}) => {
                    this.statusLikePendingMap[id] = false;
                    this.statuses = this.statuses.map(status => {
                        if (status.id === id) {
                            const originalMediaAttachments = status.media_attachments;
                            status = {...data};
                            status.media_attachments = originalMediaAttachments;
                        }
                        return status;
                    });
                })
                .finally(() => this.statusLikePendingMap[id] = false);
        }
    };

    @action
    unfavouriteStatus = id => {
        if (this.authorizationStore.accessToken) {
            this.statusLikePendingMap = {
                ...this.statusLikePendingMap,
                [id]: true
            };
            axiosInstance.post(`/api/v1/statuses/${id}/unfavourite`)
                .then(({data}) => {
                    this.statusLikePendingMap[id] = false;
                    this.statuses = this.statuses.map(status => {
                        if (status.id === id) {
                            const originalMediaAttachments = status.media_attachments;
                            status = {...data};
                            status.media_attachments = originalMediaAttachments;
                        }
                        return status;
                    });
                })
                .finally(() => this.statusLikePendingMap[id] = false);
        }
    };

    @action
    followStatusAuthor = id => {
        if (this.authorizationStore.accessToken) {
            const authorId = this.statuses.filter(status => status.id === id)
                .map(status => status.account.id)
                .reduce(authorId => authorId);
            axiosInstance.post(`/api/v1/accounts/${authorId}/follow`)
                .then(() => {
                    this.statuses = this.statuses.map(status => {
                        if (status.account.id === authorId) {
                            status.account.following = true;
                        }
                        return status;
                    });
                    this.statusAuthorSubscriptionListeners.forEach(statusAuthorSubscriptionListener => {
                        statusAuthorSubscriptionListener.subscribeToStatusAuthor(authorId, undefined);
                    })
                });
        }
    };

    @action
    followStatusAuthorByAuthorId = authorId => {
        this.statuses = this.statuses.map(status => {
            if (status.account.id === authorId) {
                status.account.following = true;
            }
            return status;
        })
    };

    @action
    unfollowStatusAuthor = id => {
        if (this.authorizationStore.accessToken) {
            const authorId = this.statuses.filter(status => status.id === id)
                .map(status => status.account.id)
                .reduce(authorId => authorId);
            axiosInstance.post(`/api/v1/accounts/${authorId}/unfollow`)
                .then(() => {
                    this.statuses = this.statuses.map(status => {
                        if (status.account.id === authorId) {
                            status.account.following = false;
                        }
                        return status;
                    });
                    this.statusAuthorUnsubscriptionListeners.forEach(statusAuthorUnsubscriptionListener => {
                        statusAuthorUnsubscriptionListener.unsubscribeFromStatusAuthor(authorId);
                    });
                });
        }
    };

    @action
    unfollowStatusAuthorByAuthorId = authorId => {
        this.statuses = this.statuses.map(status => {
            if (status.account.id === authorId) {
                status.account.following = false;
            }
            return status;
        })
    };

    @action
    increaseRepostsCount = statusId => {
        this.statuses = this.statuses.map(status => {
            if (status.id === statusId) {
                status.reposts_count += 1;
            }
            return status;
        })
    };

    @action
    increaseCommentsCount = statusId => {
        this.statuses = this.statuses.map(status => {
            if (status.id === statusId) {
                status.comments_count += 1;
            };
            return status;
        })
    };

    @action
    setBaseUrl = baseUrl => {
        this.baseUrl = baseUrl;
        this.statuses = [];
    };

    @action
    reset = () => {
        this.statuses = [];
        this.pending = false;
    };

    addStatusAuthorSubscriptionListener = statusAuthorSubscriptionListener => {
        this.statusAuthorSubscriptionListeners.push(statusAuthorSubscriptionListener);
    };

    addStatusAuthorUnsubscriptionListener = statusAuthorUnsubscriptionListener => {
        this.statusAuthorUnsubscriptionListeners.push(statusAuthorUnsubscriptionListener);
    };

    removeStatusAuthorSubscriptionListener = listenerId => {
        this.statusAuthorSubscriptionListeners = this.statusAuthorSubscriptionListeners.filter(listener => listener.id !== listenerId);
    };

    removeStatusAuthorUnsubscriptionListener = listenerId => {
        this.statusAuthorUnsubscriptionListeners = this.statusAuthorSubscriptionListeners.filter(listener => listener.id !== listenerId);
    }
}
