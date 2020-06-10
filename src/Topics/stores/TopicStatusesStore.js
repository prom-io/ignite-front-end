import { action, observable } from "mobx";
import { axiosInstance } from "../../api/axios-instance";

export class TopicStatusesStore {
    @observable
    statusesOnTopic = [];

    @observable
    currentTopicId = undefined;

    @observable
    activeTab = "hot";

    @observable
    pending = false;

    authorizationStore = undefined;

    constructor(authorizationStore) {
        this.authorizationStore = authorizationStore;
    }

    @action
    fetchAllStatuses = () => {
        this.pending = true;
        console.log(`fetching all ${this.activeTab} statuses`);
        this.pending = false;
    };

    @action
    fetchStatusesOnTopic = id => {
        this.currentTopicId = id;
        this.pending = true;
        console.log(`fetching ${this.activeTab} statuses on topic: ${id}`);
        this.statusesOnTopic = [];
        this.pending = false;
    };

    @action
    changeTabAndFetchStatuses = activeTab => {
        this.activeTab = activeTab;
        if (!this.currentTopicId) {
            this.fetchAllStatuses();
        } else {
            this.fetchStatusesOnTopic(this.currentTopicId);
        }
    };

    @action
    followTopic = () => {
        console.log("follow topic: ", this.currentTopicId);
    };

    @action
    reset = () => {
        this.currentTopicId = undefined;
        this.statusesOnTopic = [];
        this.activeTab = "hot";
        this.pending = false;
    };
}
