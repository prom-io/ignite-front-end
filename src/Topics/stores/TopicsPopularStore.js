import { action, observable } from "mobx";
import { axiosInstance } from "../../api/axios-instance";

export class TopicsPopularStore {
    @observable
    topicsPopularItems = [];

    @observable
    pending = false;

    authorizationStore = undefined;

    constructor(authorizationStore) {
        this.authorizationStore = authorizationStore;
    }

    @action
    fetchTopicsPopular = () => {
        this.pending = true;
        setTimeout(() => {
            this.topicsPopularItems = [
                {
                    id: "1",
                    title: "Topic Title 1",
                    posts_count: "512"
                },
                {
                    id: "2",
                    title: "Topic Title 2",
                    posts_count: "480"
                },
                {
                    id: "3",
                    title: "Topic Title 3",
                    posts_count: "471"
                },
                {
                    id: "4",
                    title: "Topic Title 4",
                    posts_count: "420"
                },
                {
                    id: "5",
                    title: "Topic Title 5",
                    posts_count: "386"
                },
                {
                    id: "6",
                    title: "Topic Title 6",
                    posts_count: "207"
                },
                {
                    id: "7",
                    title: "Topic Title 7",
                    posts_count: "139"
                },
                {
                    id: "8",
                    title: "Topic Title 8",
                    posts_count: "74"
                }
            ];
            this.pending = false;
        }, 1000);
    };

    @action
    reset = () => {
        this.topicsPopularItems = [];
        // this.pending = false;
    };
}
