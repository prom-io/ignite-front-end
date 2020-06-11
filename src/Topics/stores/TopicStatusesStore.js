import { action, observable } from "mobx";
import { axiosInstance } from "../../api/axios-instance";

export class TopicStatusesStore {
    @observable
    statusesOnTopic = [];

    @observable
    currentTopicId = undefined;

    @observable
    activeTab = "hot";

    @observable
    statusLikePendingMap = {};

    @observable
    pending = false;

    authorizationStore = undefined;

    constructor(authorizationStore) {
        this.authorizationStore = authorizationStore;
    }

    @action
    fetchAllStatuses = () => {
        this.pending = true;
        console.log(`fetching all ${this.activeTab} statuses`);
        axiosInstance
            .get("/api/v1/timelines/global")
            .then(({ data }) => {
                this.statusesOnTopic.push(...data);
            })
            .finally(() => (this.pending = false));
    };

    @action
    fetchStatusesOnTopic = id => {
        this.currentTopicId = id;
        this.pending = true;
        console.log(`fetching ${this.activeTab} statuses on topic: ${id}`);
        axiosInstance
            .get("/api/v1/timelines/global")
            .then(({ data }) => {
                this.statusesOnTopic.push(...data);
            })
            .finally(() => (this.pending = false));
    };

    @action
    changeTabAndFetchStatuses = activeTab => {
        this.activeTab = activeTab;
        this.statusesOnTopic = [];
        if (!this.currentTopicId) {
            this.fetchAllStatuses();
        } else {
            this.fetchStatusesOnTopic(this.currentTopicId);
        }
    };

    @action
    followTopic = () => {
        console.log("follow topic: ", this.currentTopicId);
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
    unfollowStatusAuthor = () => {
        if (this.authorizationStore.accessToken) {
            const authorId = this.statusesOnTopic
                .filter(status => status.id === this.currentStatusId)
                .map(status => status.account.id)
                .reduce(authorId => authorId);
            axiosInstance.post(`/api/v1/accounts/${authorId}/unfollow`).then(() => {
                // this.unfollowDialogOpen = false;
                this.statusesOnTopic = this.statusesOnTopic.map(status => {
                    if (status.account.id === authorId) {
                        status.account.following = false;
                    }
                    return status;
                })
                this.authorizationStore.currentUser.follows_count -= 1;
                this.statusesOnTopic = [];
                if (!this.currentTopicId) {
                    this.fetchAllStatuses();
                } else {
                    this.fetchStatusesOnTopic(this.currentTopicId);
                }
            });
        }
    };

    @action
    reset = () => {
        this.currentTopicId = undefined;
        this.statusesOnTopic = [];
        this.activeTab = "hot";
        this.pending = false;
    };

    @action
    resetStatuses = () => {
        this.statusesOnTopic = [];
    };
}
