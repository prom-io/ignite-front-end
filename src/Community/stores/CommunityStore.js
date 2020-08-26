import { observable, action } from "mobx";
import { axiosInstance } from "../../api/axios-instance";

export class CommunityStore {
    @observable
    currentCommunity = undefined;

    @observable
    communityPosts = [];

    @observable
    communityUsers = [];

    @observable
    pending = false;

    @action
    fetchCurrentCommunity = communityName => {
        console.log(communityName);

        this.pending = true;

        setTimeout(() => {
            this.currentCommunity = { name: "Test" };
            this.pending = false;
        }, 1000);
    };

    @action
    fetchCommunityPosts = () => {
        console.log("fetchCommunityPosts");

        this.pending = true;

        setTimeout(() => {
            this.communityPosts.push(...[1, 2, 3, 4, 5, 6]);
            this.pending = false;
        }, 1000);
    };

    @action
    fetchCommunityUsers = () => {
        console.log("fetchCommunityUsers");

        this.pending = true;

        setTimeout(() => {
            this.communityUsers.push(...[1, 2, 3, 4, 5, 6]);
            this.pending = false;
        }, 1000);
    };

    @action
    reset = () => {
        this.currentCommunity = undefined;
        this.communityPosts = [];
        this.communityUsers = [];
    };
}
