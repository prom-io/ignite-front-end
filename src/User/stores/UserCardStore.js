import {observable, action, reaction, computed} from "mobx";

export class UserCardStore {
    // can be either "currentUser" or "userByAddress"
    @observable
    displayMode = "currentUser";

    @computed
    get user() {
        return this.displayMode === "currentUser"
            ? this.authorizationStore.currentUser
            : this.userProfileStore.currentUser;
    }

    @computed
    get userIsLoading() {
        return this.displayMode === "currentUser"
            ? this.authorizationStore.fetchingCurrentUser
            : this.authorizationStore.fetchingUser
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
