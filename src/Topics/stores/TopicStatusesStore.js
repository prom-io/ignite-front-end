import { action, observable } from "mobx";
import { axiosInstance } from "../../api/axios-instance";

export class TopicStatusesStore {
    @observable
    statusesOnTopic = [];

    @observable
    currentTopic = {};

    @observable
    activeTab = "hot";

    @observable
    statusLikePendingMap = {};

    @observable
    pending = false;

    @observable
    hasMore = true;

    @observable
    currentStatusId = undefined;

    @observable
    currentStatusUsername = undefined;

    @observable
    unfollowDialogOpen = false;

    authorizationStore = undefined;
    memezatorDialogStore = undefined;

    constructor(authorizationStore, memezatorDialogStore) {
        this.authorizationStore = authorizationStore;
        this.memezatorDialogStore = memezatorDialogStore;
    }

    @action
    fetchAllStatuses = () => {
        this.pending = true;
        let language = localStorage.getItem("language");
        if (language !== "en" && language !== "kr") {
            language = "en";
        }
        if (this.statusesOnTopic.length !== 0) {
            const maxId = this.statusesOnTopic[this.statusesOnTopic.length - 1].id;
            axiosInstance
                .get(
                    `/api/v1/statuses?only_with_hash_tags=true&language=${language}&type=${this.activeTab}&max_id=${maxId}`
                )
                .then(({ data }) => {
                    if (data.length !== 0) {
                        this.statusesOnTopic.push(...data);
                    } else {
                        this.hasMore = false;
                    }
                })
                .finally(() => (this.pending = false));
        } else {
            axiosInstance
                .get(
                    `/api/v1/statuses?only_with_hash_tags=true&language=${language}&type=${this.activeTab}`
                )
                .then(({ data }) => {
                    if (data.length !== 0) {
                        this.statusesOnTopic = data;
                    } else {
                        this.hasMore = false;
                    }
                })
                .finally(() => (this.pending = false));
        }
    };

    @action
    fetchStatusesOnTopic = () => {
        this.pending = true;
        let language = localStorage.getItem("language");
        if (language !== "en" && language !== "kr") {
            language = "en";
        }
        if (this.statusesOnTopic.length !== 0) {
            const maxId = this.statusesOnTopic[this.statusesOnTopic.length - 1].id;
            axiosInstance
                .get(
                    `/api/v1/topics/${this.currentTopic.title}/statuses?language=${language}&type=${this.activeTab}&max_id=${maxId}`
                )
                .then(({ data }) => {
                    if (data.length !== 0) {
                        this.statusesOnTopic.push(...data);
                    } else {
                        this.hasMore = false;
                    }
                })
                .finally(() => (this.pending = false));
        } else {
            axiosInstance
                .get(
                    `/api/v1/topics/${this.currentTopic.title}/statuses?language=${language}&type=${this.activeTab}`
                )
                .then(({ data }) => {
                    if (data.length !== 0) {
                        this.statusesOnTopic = data;
                    } else {
                        this.hasMore = false;
                    }
                })
                .finally(() => (this.pending = false));
        }
    };

    @action
    changeTabAndFetchStatuses = activeTab => {
        this.activeTab = activeTab;
        this.statusesOnTopic = [];
        if (!this.currentTopic.id) {
            this.fetchAllStatuses();
        } else {
            this.fetchStatusesOnTopic();
        }
    };

    @action
    fetchTopicInfo = title => {
        let language = localStorage.getItem("language");
        if (language !== "en" && language !== "kr") {
            language = "en";
        }
        axiosInstance
            .get(`/api/v1/topics/${title}?language=${language}`)
            .then(({ data }) => {
                this.currentTopic = data;
                this.fetchStatusesOnTopic();
            });
    };

    @action
    followTopic = () => {
        axiosInstance
            .post(`/api/v1/topics/${this.currentTopic.id}/follow`)
            .then(() => {
                this.currentTopic.following = true;
            });
    };

    @action
    unfollowTopic = () => {
        axiosInstance
            .delete(`/api/v1/topics/${this.currentTopic.id}/unfollow`)
            .then(() => {
                this.currentTopic.following = false;
            });
    };

    @action
    favouriteStatus = id => {
        if (this.authorizationStore.accessToken) {
            this.statusLikePendingMap = {
                ...this.statusLikePendingMap,
                [id]: true
            };
            axiosInstance
                .post(`/api/v1/statuses/${id}/favourite`)
                .then(({ data }) => {
                    this.statusLikePendingMap[id] = false;
                    this.statusesOnTopic = this.statusesOnTopic.map(status => {
                        if (status.id === id) {
                            const originalMediaAttachments =
                                status.media_attachments;
                            status = { ...data };
                            status.media_attachments = originalMediaAttachments;
                        }
                        return status;
                    });
                })
                .catch(error => {
                    this.statusLikePendingMap[id] = false;
                    this.statusesOnTopic = this.statusesOnTopic.map(status => {
                        if (status.id === id) {
                            const originalMediaAttachments =
                                status.media_attachments;
                            status.media_attachments = originalMediaAttachments;
                        }
                        return status;
                    });
                    this.memezatorDialogStore.openDialogByError(error);
                })
                .finally(() => (this.statusLikePendingMap[id] = false));
        }
    };

    @action
    unfavouriteStatus = id => {
        if (this.authorizationStore.accessToken) {
            this.statusLikePendingMap = {
                ...this.statusLikePendingMap,
                [id]: true
            };
            axiosInstance
                .post(`/api/v1/statuses/${id}/unfavourite`)
                .then(({ data }) => {
                    this.statusLikePendingMap[id] = false;
                    this.statusesOnTopic = this.statusesOnTopic.map(status => {
                        if (status.id === id) {
                            const originalMediaAttachments =
                                status.media_attachments;
                            status = { ...data };
                            status.media_attachments = originalMediaAttachments;
                        }
                        return status;
                    });
                })
                .catch(error => {
                    this.statusLikePendingMap[id] = false;
                    this.statusesOnTopic = this.statusesOnTopic.map(status => {
                        if (status.id === id) {
                            const originalMediaAttachments =
                                status.media_attachments;
                            status.media_attachments = originalMediaAttachments;
                        }
                        return status;
                    });
                    this.memezatorDialogStore.openDialogByError(error);
                })
                .finally(() => (this.statusLikePendingMap[id] = false));
        }
    };

    @action
    followStatusAuthor = id => {
        if (this.authorizationStore.accessToken) {
            const authorId = this.statusesOnTopic
                .filter(status => status.id === id)
                .map(status => status.account.id)
                .reduce(authorId => authorId);
            axiosInstance.post(`/api/v1/accounts/${authorId}/follow`).then(() => {
                this.authorizationStore.currentUser.follows_count += 1;
                this.statusesOnTopic = this.statusesOnTopic.map(status => {
                    if (status.account.id === authorId) {
                        status.account.following = true;
                    }
                    return status;
                });
            });
        }
    };

    @action
    unfollowStatusAuthorWithDialog = (statusId, username) => {
        this.currentStatusId = statusId;
        this.currentStatusUsername = username;
        this.unfollowDialogOpen = true;
    };

    @action
    unfollowStatusAuthor = () => {
        if (this.authorizationStore.accessToken) {
            const authorId = this.statusesOnTopic
                .filter(status => status.id === this.currentStatusId)
                .map(status => status.account.id)
                .reduce(authorId => authorId);
            axiosInstance.post(`/api/v1/accounts/${authorId}/unfollow`).then(() => {
                this.unfollowDialogOpen = false;
                this.statusesOnTopic = this.statusesOnTopic.map(status => {
                    if (status.account.id === authorId) {
                        status.account.following = false;
                    }
                    return status;
                });
                this.authorizationStore.currentUser.follows_count -= 1;
            });
        }
    };

    @action
    setUnfollowDialogOpen = unfollowDialogOpen => {
        this.unfollowDialogOpen = unfollowDialogOpen;
    };

    @action
    reset = () => {
        this.currentTopic = {};
        this.statusesOnTopic = [];
        this.activeTab = "hot";
        this.pending = false;
        this.hasMore = true;
        this.currentStatusId = undefined;
        this.currentStatusUsername = undefined;
        this.unfollowDialogOpen = false;
    };

    @action
    resetStatuses = () => {
        this.statusesOnTopic = [];
    };
}
