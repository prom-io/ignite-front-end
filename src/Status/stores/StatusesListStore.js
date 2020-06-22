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

    @observable
    onlyAddCommentsToThisStatus = undefined;

    @observable
    hasMore = true;

    @observable
    currentStatusId = undefined;

    @observable
    currentStatusUsername = undefined;

    @observable
    unfollowDialogOpen = false;

    authorizationStore = undefined;
    createStatusStore = undefined;

    statusAuthorSubscriptionListeners = [];
    statusAuthorUnsubscriptionListeners = [];
    reverseOrder = false;
    sendLanguage = false;
    dynamicBaseUrl = false;

    @computed
    get createdStatus() {
        return this.createStatusStore.createdStatus;
    }

    constructor(authorizationStore, createStatusStore, baseUrl, reverseOrder, sendLanguage = false, dynamicBaseUrl = false) {
        this.authorizationStore = authorizationStore;
        this.createStatusStore = createStatusStore;
        this.baseUrl = baseUrl;
        this.reverseOrder = reverseOrder;
        this.sendLanguage = sendLanguage;
        this.dynamicBaseUrl = dynamicBaseUrl;

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
                    if (this.onlyAddCommentsToThisStatus) {
                        if (status.referred_status && status.status_reference_type === "COMMENT") {
                            this.statuses = [
                                ...this.statuses,
                                status,
                            ];
                        }
                    } else {
                        this.statuses = [
                            status,
                            ...this.statuses
                        ];
                    }

                    if (status.referred_status) {
                        if (status.status_reference_type === "REPOST") {
                            this.increaseRepostsCount(status.referred_status.id)
                        } else {
                            this.increaseCommentsCount(status.referred_status.id);
                        }
                    }
                }
            }
        )
    }

    @action
    setOnlyAddCommentsToStatus = statusId => {
        this.onlyAddCommentsToThisStatus = statusId;
    };

    @action
    fetchStatuses = () => {
        this.pending = true;

        console.log(`Fetching statuses by base url ${this.baseUrl}`);

        if (this.baseUrl) {
            if (this.statuses.length !== 0) {
                if (this.reverseOrder) {
                    const minId = this.statuses[this.statuses.length - 1].id;
                    let url;
                    if (this.sendLanguage) {
                        let language = localStorage.getItem("language");
                        if (language !== "en" && language !== "ko") {
                            language = "en";
                        }
                        url = `${this.baseUrl}?since_id=${minId}&language=${language}`;
                    } else{
                        url = `${this.baseUrl}?since_id=${minId}`;
                    }
                    axiosInstance.get(url)
                        .then(({data}) => {
                            if (data.length !== 0) {
                                this.statuses.push(...data);
                            } else {
                                this.hasMore = false;
                            }
                        })
                        .finally(() => this.pending = false);
                } else {
                    let url;
                    const maxId = this.statuses[this.statuses.length - 1].id;

                    if (this.sendLanguage) {
                        let language = localStorage.getItem("language");
                        if (language !== "en" && language !== "ko") {
                            language = "en";
                        }
                        url = `${this.baseUrl}?max_id=${maxId}&language=${language}`;
                    } else {
                        url = `${this.baseUrl}?max_id=${maxId}`
                    }
                    axiosInstance.get(url)
                        .then(({data}) => {
                            if (data.length !== 0) {
                                this.statuses.push(...data);
                            } else {
                                this.hasMore = false;
                            }
                        })
                        .finally(() => this.pending = false);
                }
            } else {
                let url;

                if (this.sendLanguage) {
                    let language = localStorage.getItem("language");
                    if (language !== "en" && language !== "ko") {
                        language = "en";
                    }
                    url = `${this.baseUrl}?language=${language}`;
                } else {
                    url = `${this.baseUrl}`;
                }
                axiosInstance.get(`${url}`)
                    .then(({data}) => {
                        if (data.length !== 0) {
                            this.statuses.push(...data);
                        } else {
                            this.hasMore = false;
                        }
                    })
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
                    this.authorizationStore.currentUser.follows_count += 1;
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
    unfollowStatusAuthor = () => {
        if (this.authorizationStore.accessToken) {
            const authorId = this.statuses.filter(status => status.id === this.currentStatusId)
                .map(status => status.account.id)
                .reduce(authorId => authorId);
            axiosInstance.post(`/api/v1/accounts/${authorId}/unfollow`)
                .then(() => {
                    this.unfollowDialogOpen = false;
                    this.unfollowStatusAuthorByAuthorId(authorId);
                    this.statusAuthorUnsubscriptionListeners.forEach(statusAuthorUnsubscriptionListener => {
                        statusAuthorUnsubscriptionListener.unsubscribeFromStatusAuthor(authorId);
                    });
                    this.authorizationStore.currentUser.follows_count -= 1;
                    this.reset();
                    this.fetchStatuses();
                });
        }
    }

    @action
    unfollowStatusAuthorWithDialog = (statusId, username) => {
        this.currentStatusId = statusId;
        this.currentStatusUsername = username;
        this.unfollowDialogOpen = true;
    }

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
            }
            return status;
        })
    };

    @action
    setBaseUrl = baseUrl => {
        this.baseUrl = baseUrl;
        this.statuses = [];
    };

    @action
    setCurrentStatusId = currentStatusId => {
        this.currentStatusId = currentStatusId;
    };

    @action
    setUnfollowDialogOpen = unfollowDialogOpen => {
        this.unfollowDialogOpen = unfollowDialogOpen;
    };

    @action
    reset = () => {
        if (this.dynamicBaseUrl) {
            this.baseUrl = undefined;
        }

        this.statuses = [];
        this.currentStatusId = undefined;
        this.currentStatusUsername = undefined;
        this.unfollowDialogOpen = false;
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
