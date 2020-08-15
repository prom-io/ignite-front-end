import { observable, action, reaction } from "mobx";
import { axiosInstance } from "../../api/axios-instance";

export class MemezatorActionsStore {
    @observable
    actionRights = undefined;

    @observable
    pending = false;

    authorizationStore = undefined;

    constructor(authorizationStore) {
        this.authorizationStore = authorizationStore;

        reaction(
            () => this.authorizationStore.currentUser,
            currentUser => !currentUser && this.reset()
        );
    }

    @action
    fetchAccessToMemezatorPosting = () => {
        this.pending = true;

        axiosInstance
            .get("/api/v1/accounts/current/memezator-actions-rights")
            .then(({ data }) => {
                this.actionRights = data;
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                this.pending = false;
            });
    };

    @action
    reset = () => {
        this.actionRights = undefined;
    };
}
