import { observable, action, reaction } from "mobx";
import { axiosInstance } from "../../api/axios-instance";

export class MemezatorActionsStore {
    @observable
    actionRights = undefined;

    @observable
    pending = false;

    authorizationStore = undefined;
    createStatusStore = undefined;

    constructor(authorizationStore, createStatusStore) {
        this.authorizationStore = authorizationStore;
        this.createStatusStore = createStatusStore;

        reaction(
            () => this.authorizationStore.currentUser,
            currentUser => {
                this.reset();

                if (currentUser && window.location.pathname === "/memezator") {
                    this.fetchAccessToMemezatorPosting();
                }
            }
        );

        reaction(
            () => this.createStatusStore.createdMemeStatus,
            () => this.fetchAccessToMemezatorPosting()
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
