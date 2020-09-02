import {action, observable} from "mobx";
import {axiosInstance} from "../../api/axios-instance";

export class UserFollowersStore {
    @observable
    followers = [];

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
    fetchUserFollowers = idOrUsername => {
        if (idOrUsername && this.idOrUsername !== idOrUsername) {
            this.idOrUsername = idOrUsername;
        }

        this.pending = true;

        axiosInstance.get(`/api/v1/accounts/${this.idOrUsername}/followers?page=${this.page}`)
            .then(({data}) => {
                if (data.length !== 0) {
                    this.page = this.page + 1;
                    this.followers.push(...data);
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
        this.followers = [];
        this.pending = false;
        this.error = undefined;
        this.idOrUsername = undefined;
        this.hasMore = true;
    }
}
