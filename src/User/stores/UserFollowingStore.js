import {action, observable} from "mobx";
import {axiosInstance} from "../../api/axios-instance";

export class UserFollowingStore {
    @observable
    following = [];

    @observable
    pending = false;

    @observable
    error = undefined;

    @action
    fetchFollowing = idOrUsername => {
        this.pending = true;

        axiosInstance.get(`/api/v1/accounts/${idOrUsername}/following`)
            .then(({data}) => this.following = data)
            .catch(error => this.error = error)
            .finally(() => this.pending = false)
    };

    @action
    reset = () => {
        this.following = [];
    }
}
