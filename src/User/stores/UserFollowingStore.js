import {action, observable} from "mobx";
import {axiosInstance} from "../../api/axios-instance";

export class UserFollowingStore {
    @observable
    following = [];

    @observable
    pending = false;

    @observable
    error = undefined;

    @observable
    page = 1;

    @observable
    hasMore = true;

    @observable
    idOrUsername = undefined;

    @action
    fetchFollowing = idOrUsername => {
        if (idOrUsername && this.idOrUsername !== idOrUsername) {
            this.idOrUsername = idOrUsername;
        }

        this.pending = true;

        axiosInstance.get(`/api/v1/accounts/${this.idOrUsername}/following?page=${this.page}`)
            .then(({data}) => {
                if (data.length !== 0) {
                    this.page = this.page + 1;
                    this.following.push(...data);
                } else {
                    this.hasMore = false;
                }
            })
            .catch(error => this.error = error)
            .finally(() => this.pending = false)
    };

    @action
    reset = () => {
        this.page = 1;
        this.following = [];
        this.error = undefined;
        this.pending = false;
        this.hasMore = true;
        this.idOrUsername = undefined;
    }
}
