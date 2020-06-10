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
    fetchStatusesOnTopic = id => {
        this.currentTopicId = id;
        this.pending = true;
        console.log(`fetch ${this.activeTab} statuses on topic: ${id}`);
        this.statusesOnTopic = [];
        this.pending = false;
    };

    @action
    reset = () => {
        this.statusesOnTopic = [];
        this.currentTopicId = undefined;
        this.activeTab = "hot";
        this.pending = false;
    };
}
