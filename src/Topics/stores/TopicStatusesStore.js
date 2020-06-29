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

    authorizationStore = undefined;

    constructor(authorizationStore) {
        this.authorizationStore = authorizationStore;
    }

    @action
    fetchAllStatuses = () => {
        this.pending = true;
        let url;
        let language = localStorage.getItem("language");
        if (language !== "en" && language !== "kr") {
            language = "en";
        }
        if (this.statusesOnTopic.length !== 0) {
            const maxId = this.statusesOnTopic[this.statusesOnTopic.length - 1].id;
            url = `/api/v1/statuses?only_with_hash_tags=true&laguage=${language}&type=${this.activeTab}&max_id=${maxId}`;
        } else {
            url = `/api/v1/statuses?only_with_hash_tags=true&laguage=${language}&type=${this.activeTab}`;
        }
        axiosInstance
            .get(url)
            .then(({ data }) => {
                if (data.length !== 0) {
                    this.statusesOnTopic.push(...data);
                } else {
                    this.hasMore = false;
                }
            })
            .finally(() => (this.pending = false));
    };

    @action
    fetchStatusesOnTopic = () => {
        this.pending = true;
        let url;
        let language = localStorage.getItem("language");
        if (language !== "en" && language !== "kr") {
            language = "en";
        }
        if (this.statusesOnTopic.length !== 0) {
            const maxId = this.statusesOnTopic[this.statusesOnTopic.length - 1].id;
            url = `/api/v1/topics/${this.currentTopic.title}/statuses?laguage=${language}&type=${this.activeTab}&max_id=${maxId}`;
        } else {
            url = `/api/v1/topics/${this.currentTopic.title}/statuses?laguage=${language}&type=${this.activeTab}`;
        }
        axiosInstance
            .get(url)
            .then(({ data }) => {
                if (data.length !== 0) {
                    this.statusesOnTopic.push(...data);
                } else {
                    this.hasMore = false;
                }
            })
            .finally(() => (this.pending = false));
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
        console.log("follow topic: ", this.currentTopic.title);
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
                this.statusesOnTopic = this.statusesOnTopic.map(status => {
                    if (status.account.id === authorId) {
                        status.account.following = false;
                    }
                    return status;
                });
                this.authorizationStore.currentUser.follows_count -= 1;
                this.statusesOnTopic = [];
                if (!this.currentTopic.id) {
                    this.fetchAllStatuses();
                } else {
                    this.fetchStatusesOnTopic();
                }
            });
        }
    };

    @action
    reset = () => {
        this.currentTopic = {};
        this.statusesOnTopic = [];
        this.activeTab = "hot";
        this.pending = false;
    };

    @action
    resetStatuses = () => {
        this.statusesOnTopic = [];
    };
}
