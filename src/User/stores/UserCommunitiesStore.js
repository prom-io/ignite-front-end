import { action, observable } from "mobx";
import { axiosInstance } from "../../api/axios-instance";

export class UserCommunitiesStore {
    @observable
    communities = [];

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
    fetchCommunities = idOrUsername => {
        if (idOrUsername && this.idOrUsername !== idOrUsername) {
            this.idOrUsername = idOrUsername;
        }

        this.pending = true;

        axiosInstance
            .get(
                `/api/v1/accounts/${this.idOrUsername}/communities?page=${this.page}`
            )
            .then(({ data }) => {
                if (data.length !== 0) {
                    this.page = this.page + 1;
                    this.following.push(...data);
                } else {
                    this.hasMore = false;
                }
            })
            .catch(error => (this.error = error))
            .finally(() => (this.pending = false));
    };

    @action
    reset = () => {
        this.page = 1;
        this.communities = [];
        this.error = undefined;
        this.pending = false;
        this.hasMore = true;
        this.idOrUsername = undefined;
    };
}
