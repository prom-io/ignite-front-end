import { action, observable } from "mobx";
import { axiosInstance } from "../../api/axios-instance";

export class FollowActionStore {
    @observable
    selectedUser = "";

    @observable
    unfollowDialogOpen = false;

    pending = false;

    setStatusBtn = undefined;

    authorizationStore = undefined;

    constructor(authorizationStore) {
        this.authorizationStore = authorizationStore;
    }

    @action
    actionWithFollow = (user, setStatusBtn) => {
        if (!this.pending) {
            this.pending = true;
            this.setStatusBtn = setStatusBtn;
            if (user.following || user.followingForBtn) {
                this.unfollowDialogOpen = true;
                this.selectedUser = user;
                this.pending = false;
            } else {
                axiosInstance
                    .post(`/api/v1/accounts/${user.id}/follow`)
                    .then(() => {
                        this.authorizationStore.currentUser.follows_count += 1;
                        user.followingForBtn = true;
                        this.setStatusBtn("following");
                    })
                    .catch(error => (this.error = error))
                    .finally(() => (this.pending = false));
            }
        }
    };

    @action
    unfollowUser = () => {
        axiosInstance
            .post(`/api/v1/accounts/${this.selectedUser.id}/unfollow`)
            .then(() => {
                this.unfollowDialogOpen = false;
                this.setStatusBtn("follow");
                this.selectedUser.following = false;
                this.selectedUser.followingForBtn = false;
                this.authorizationStore.currentUser.follows_count -= 1;
            })
            .catch(error => (this.error = error))
            .finally(() => (this.setStatusBtn = undefined));
    };

    @action
    setUnfollowDialogOpen = unfollowDialogOpen => {
        this.unfollowDialogOpen = unfollowDialogOpen;
        this.setStatusBtn = undefined;
    };

    @action
    reset = () => {
        this.selectedUser = false;
        this.unfollowDialogOpen = false;
        this.setStatusBtn = undefined;
    };
}
