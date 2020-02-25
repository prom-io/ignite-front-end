import {action, reaction, observable, computed} from "mobx";

export class TimelinesSwitcherStore {
    globalTimeLineStore = undefined;
    homeTimelineStore = undefined;
    authorizationStore = undefined;

    @observable
    switchOnUserChange = false;

    @observable
    currentTimeline = "global";

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
                    if (currentUser && currentUser.follows_count !== 0) {
                        this.homeTimelineStore.reset();
                        this.homeTimelineStore.fetchStatuses();
                        this.globalTimeLineStore.reset();
                        this.currentTimeline = "home";
                    } else {
                        this.globalTimeLineStore.reset();
                        this.globalTimeLineStore.fetchStatuses();
                        this.homeTimelineStore.reset();
                        this.currentTimeline = "global";
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
