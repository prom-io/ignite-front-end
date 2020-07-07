import { action, observable } from "mobx";
import { axiosInstance } from "../../api/axios-instance";

export class TopicsPopularStore {
    @observable
    topicsPopularItems = [];

    @observable
    isTopicsMenuOpen = false;

    @observable
    pending = false;

    authorizationStore = undefined;

    constructor(authorizationStore) {
        this.authorizationStore = authorizationStore;
    }

    @action
    fetchTopicsPopular = (count = 15) => {
        this.pending = true;
        axiosInstance
            .get(`/api/v1/topics?count=${count}`)
            .then(({ data }) => (this.topicsPopularItems = [...data]))
            .finally(() => (this.pending = false));
    };

    @action
    setIsTopicsMenuOpen = isTopicsMenuOpen => {
        this.isTopicsMenuOpen = isTopicsMenuOpen;
    };

    @action
    reset = () => {
        this.topicsPopularItems = [];
        this.isTopicsMenuOpen = false;
        // this.pending = false;
    };
}
