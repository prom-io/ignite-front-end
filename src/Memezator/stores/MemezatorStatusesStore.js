import { observable, action, reaction } from "mobx";
import { axiosInstance } from "../../api/axios-instance";

export class MemezatorStatusesStore {
    @observable
    statuses = [];

    @observable
    statusLikePendingMap = {};

    @observable
    hasMore = true;

    @observable
    currentStatusId = undefined;

    @observable
    currentStatusUsername = undefined;

    @observable
    memezatorError = undefined;

    @observable
    pending = false;

    authorizationStore = undefined;
    createStatusStore = undefined;
    memezatorDialogStore = undefined;

    constructor(authorizationStore, createStatusStore, memezatorDialogStore) {
        this.authorizationStore = authorizationStore;
        this.createStatusStore = createStatusStore;
        this.memezatorDialogStore = memezatorDialogStore;

        reaction(
            () => this.authorizationStore.currentUser,
            () => {
                this.reset();

                if (window.location.pathname === "/memezator") {
                    this.fetchMemezatorStatuses();
                }
            }
        );

        reaction(
            () => this.createStatusStore.createdMemeStatus,
            status => {
                if (status) {
                    this.statuses = [status, ...this.statuses];
                }
            }
        );
    }

    @action
    fetchMemezatorStatuses = () => {
        this.pending = true;

        let url;
        if (this.statuses.length > 0) {
            const maxId = this.statuses[this.statuses.length - 1].id;
            url = `/api/v1/statuses?type=memes&max_id=${maxId}`;
        } else {
            url = "/api/v1/statuses?type=memes";
        }

        axiosInstance
            .get(url)
            .then(({ data }) => {
                if (data.length !== 0) {
                    this.statuses.push(...data);
                } else {
                    this.hasMore = false;
                }
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                this.pending = false;
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
                    this.statuses = this.statuses.map(status => {
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
                    this.statuses = this.statuses.map(status => {
                        if (status.id === id) {
                            const originalMediaAttachments =
                                status.media_attachments;
                            status.media_attachments = originalMediaAttachments;
                        }
                        return status;
                    });
                    this.memezatorDialogStore.openDialogByError(error);
                })
                .finally(() => {
                    this.statusLikePendingMap[id] = false;
                });
        }
    };

    @action
    followStatusAuthor = id => {
        if (this.authorizationStore.accessToken) {
            const authorId = this.statuses
                .filter(status => status.id === id)
                .map(status => status.account.id)
                .reduce(authorId => authorId);

            axiosInstance.post(`/api/v1/accounts/${authorId}/follow`).then(() => {
                this.authorizationStore.setFollowsCount(
                    this.authorizationStore.currentUser.follows_count + 1
                );
                this.followStatusAuthorByAuthorId(authorId);
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
        });
    };

    @action
    unfollowStatusAuthor = () => {
        if (this.authorizationStore.accessToken) {
            const authorId = this.statuses
                .filter(status => status.id === this.currentStatusId)
                .map(status => status.account.id)
                .reduce(authorId => authorId);

            axiosInstance.post(`/api/v1/accounts/${authorId}/unfollow`).then(() => {
                this.unfollowDialogOpen = false;
                this.unfollowStatusAuthorByAuthorId(authorId);
                this.authorizationStore.setFollowsCount(
                    this.authorizationStore.currentUser.follows_count - 1
                );
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
        });
    };

    @action
    unfollowStatusAuthorWithDialog = (statusId, username) => {
        this.currentStatusId = statusId;
        this.currentStatusUsername = username;
        this.unfollowDialogOpen = true;
    };

    @action
    setUnfollowDialogOpen = unfollowDialogOpen => {
        this.unfollowDialogOpen = unfollowDialogOpen;
    };

    @action
    reset = () => {
        this.statuses = [];
        this.currentStatusId = undefined;
        this.currentStatusUsername = undefined;
        this.unfollowDialogOpen = false;
        this.pending = false;
    };
}
