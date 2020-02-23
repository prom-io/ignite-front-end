import {action, observable} from "mobx";
import {axiosInstance} from "../../api/axios-instance";

export class UserFollowersStore {
    @observable
    followers = [];

    @observable
    pending = false;

    @observable
    error = undefined;

    @action
    fetchUserFollowers = username => {
        this.pending = true;

        axiosInstance.get(`/api/v1/accounts/${username}/followers/`)
            .then(({data}) => this.followers = data)
            .catch(error => this.error = error)
            .finally(() => this.pending = false)
    };

    @action
    reset = () => {
        this.followers = [];
        this.pending = false;
        this.error = undefined;
    }
}
