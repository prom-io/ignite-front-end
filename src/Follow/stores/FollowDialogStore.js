import { action, observable } from "mobx";
import { axiosInstance } from "../../api/axios-instance";

export class FollowDialogStore {
    @observable
    selectedUserId = "";

    @observable
    followDialogOpen = false;

    @observable
    pending = false;

    authorizationStore = undefined;

    constructor(authorizationStore) {
        this.authorizationStore = authorizationStore;
    }

    @action
    unfollowUser = () => {
        console.log("unfollow: ", this.selectedUser);
        // axiosInstance.post(`/api/v1/accounts/${this.user.id}/follow`).then(() => {
        //     this.authorizationStore.followers_count += 1;
        // });
    };

    @action
    selectUserForFolowing = selectedUserId => {
        this.selectedUserId = selectedUserId;
    };

    @action
    setFollowDialogOpen = followDialogOpen => {
        this.followDialogOpen = followDialogOpen;
    };

    @action
    reset = () => {
        this.selectedUser = false;
        this.followDialogOpen = false;
        this.pending = false;
    };
}
