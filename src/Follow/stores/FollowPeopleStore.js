import { action, observable, reaction } from "mobx";
import { axiosInstance } from "../../api/axios-instance";

export class FollowPeopleStore {
    @observable
    followPeopleItems = [];

    @observable
    followInputValue = "";

    @observable
    pending = false;

    @observable
    hasMore = true;

    page = 1;

    authorizationStore = undefined;

    constructor(authorizationStore) {
        this.authorizationStore = authorizationStore;

        reaction(
            () => this.followInputValue,
            inputValue => !inputValue && this.fetchFollowPeople(true)
        );
    }

    @action
    setFollowInputValue = value => {
        this.followInputValue = value;
    };

    @action
    fetchFollowPeople = isNew => {
        if (isNew) {
            this.followPeopleItems = [];
            this.page = 1;
        }

        this.pending = true;

        let language = localStorage.getItem("language");
        if (language !== "en" && language !== "kr") {
            language = "en";
        }
        axiosInstance
            .get(
                `/api/v1/accounts/follow-recommendations?language=${language}&page=${this.page}`
            )
            .then(({ data }) => {
                if (data.length > 0) {
                    this.followPeopleItems.push(...data);
                    this.page++;
                } else {
                    this.hasMore = false;
                }
            })
            .catch(() => {})
            .finally(() => (this.pending = false));
    };

    @action
    fetchSearchPeople = isNew => {
        if (isNew) {
            this.followPeopleItems = [];
            this.page = 0;
        }

        this.pending = true;

        let searchUrl;
        if (this.page === 0) {
            searchUrl = `/api/v1/accounts?q=${this.followInputValue}&take=15`;
        } else {
            const skip = this.page * 15;
            searchUrl = `/api/v1/accounts?q=${this.followInputValue}&skip=${skip}&take=15`;
        }

        axiosInstance
            .get(searchUrl)
            .then(({ data }) => {
                if (data.length > 0) {
                    this.followPeopleItems.push(...data);
                    this.page++;
                } else {
                    this.hasMore = false;
                }
            })
            .catch(() => {})
            .finally(() => (this.pending = false));
    };

    @action
    reset = () => {
        this.followPeopleItems = [];
        this.followInputValue = "";
        this.pending = false;
        this.page = 1;
    };
}
