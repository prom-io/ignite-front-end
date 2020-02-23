import {action, reaction, observable, computed} from "mobx";

export class TimelinesSwitcherStore {
    globalTimeLineStore = undefined;
    homeTimelineStore = undefined;
    authorizationStore = undefined;

    @observable
    switchOnUserChange = false;

    @computed
    get currentUser() {
        return this.authorizationStore.currentUser;
    }

    @computed
    get selectedTimeline() {
        return this.currentUser ? this.homeTimelineStore : this.globalTimeLineStore;
    }

    constructor(globalTimelineStore, homeTimelineStore, authorizationStore) {
        this.globalTimeLineStore = globalTimelineStore;
        this.homeTimelineStore = homeTimelineStore;
        this.authorizationStore = authorizationStore;

        reaction(
            () => this.currentUser,
            currentUser => {
                if (this.switchOnUserChange) {
                    if (currentUser) {
                        this.homeTimelineStore.reset();
                        this.homeTimelineStore.fetchStatuses();
                        this.globalTimeLineStore.reset();
                    } else {
                        this.globalTimeLineStore.reset();
                        this.globalTimeLineStore.fetchStatuses();
                        this.homeTimelineStore.reset();
                    }
                }
            }
        )
    }

    @action
    setSwitchOnUserChange = switchOnUserChange => {
        this.switchOnUserChange = switchOnUserChange;
    }
}
