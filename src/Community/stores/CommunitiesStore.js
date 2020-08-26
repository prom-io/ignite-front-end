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
    fetchCommunities = () => {};
}
