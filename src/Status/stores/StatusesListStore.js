import {action, observable, reaction} from "mobx";
import {axiosInstance} from "../../api/axios-instance";

export class GlobalTimelineStore {
    @observable
    statuses = [];

    @observable
    pending = false;

    authorizationStore = undefined;

    constructor(authorizationStore) {
        this.authorizationStore = authorizationStore;

        reaction(
            () => this.authorizationStore.accessToken,
            () => {
                this.statuses = [];
                this.fetchStatuses();
            }
        )
    }

    @action
    fetchStatuses = () => {
        this.pending = true;

        if (this.statuses.length !== 0) {
            const maxId = this.statuses[this.statuses.length - 1].id;
            axiosInstance.get(`/api/v1/timelines/global?max_id=${maxId}`)
                .then(({data}) => this.statuses.push(...data))
                .finally(() => this.pending = false);
        } else {
            axiosInstance.get(`/api/v1/timelines/global`)
                .then(({data}) => this.statuses.push(...data))
                .finally(() => this.pending = false)
        }
    };

    @action
    favouriteStatus = id => {
        if (this.authorizationStore.accessToken) {
            axiosInstance.post(`/api/v1/statuses/${id}/favourite`)
                .then(({data}) => this.statuses = this.statuses.map(status => status.id === id ? data : status));
        }
    };

    @action
    unfavouriteStatus = id => {
        if (this.authorizationStore.accessToken) {
            axiosInstance.post(`/api/v1/statuses/${id}/unfavourite`)
                .then(({data}) => this.statuses = this.statuses.map(status => status.id === id ? data : status));
        }
    }
}
