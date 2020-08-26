import { observable, action } from "mobx";
import { axiosInstance } from "../../api/axios-instance";

export class CommunitiesStore {
    @observable
    communities = [];

    @observable
    hasMore = true;

    @observable
    pending = false;

    @action
    fetchCommunities = (type, reset) => {
        if (reset) {
            this.communities = [];
        }
        
        this.pending = true;

        if (type === "all") {
            setTimeout(() => {
                this.communities.push(...[1, 2, 3, 4, 5, 6, 7, 8, 9]);
                this.pending = false;
            }, 1000);
        } else if (type === "my") {
            setTimeout(() => {
                this.communities.push(...[]);
                this.pending = false;
            }, 1000);
        }
    };

    @action
    reset = () => {
        this.communities = [];
        this.hasMore = true;
    };
}
