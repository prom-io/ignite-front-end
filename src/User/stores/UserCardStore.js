import {action, computed, observable} from "mobx";

export class UserCardStore {
    // can be either "currentUser" or "userByAddress"
    @observable
    displayMode = "currentUser";

    @computed
    get user() {
        return this.displayMode === "currentUser"
            ? this.authorizationStore.currentUser
            : this.userProfileStore.user;
    }

    @computed
    get userIsLoading() {
        return this.displayMode === "currentUser"
            ? this.authorizationStore.fetchingCurrentUser
            : this.userProfileStore.fetchingUser
    }

    authorizationStore = undefined;
    userProfileStore = undefined;

    constructor(authorizationStore, userProfileStore) {
        this.authorizationStore = authorizationStore;
        this.userProfileStore = userProfileStore;
    }

    @action
    setDisplayMode = displayMode => {
        this.displayMode = displayMode;
    }
}
