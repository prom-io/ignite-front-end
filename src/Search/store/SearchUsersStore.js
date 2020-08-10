import { action, observable, reaction } from "mobx";
import debounce from "@material-ui/core/utils/debounce";
import { axiosInstance } from "../../api/axios-instance";

export class SearchUsersStore {
    @observable
    searchValue = undefined;

    @observable
    searchResult = [];

    @observable
    searchResultStatus = "";

    @observable
    shouldResetResults = false;

    @observable
    pending = false;

    @observable
    page = 1;

    @observable
    hasMore = true;

    authorizationStore = undefined;

    constructor(authorizationStore) {
        this.authorizationStore = authorizationStore;
        reaction(
            () => this.searchValue,
            debounce(inputValue => {
                this.shouldResetResults = true;
                inputValue && this.doSearch(inputValue);
            }, 350)
        );
    }

    @action
    setSearchValue = value => {
        this.searchValue = value;
    };
    @action
    setSearchResult = result => {
        this.searchResult = result;
    };

    cleanSearchValue = () => {
        this.searchValue = "";
        this.setSearchResult([]);
    };

    @action
    doSearch = inputValue => {
        if (this.shouldResetResults) {
            this.searchResult = [];
            this.page = 1;
            this.shouldResetResults = false;
        }

        this.pending = true;

        axiosInstance
            .get(`/api/v1/accounts`, {
                params: {
                    q: inputValue,
                    take: 15
                }
            })
            .then(({ data }) => {
                this.setSearchResult(data);
                console.log("doSearch searchResult", this.searchResult);
                this.pending = false;
            })
            .catch(err => {
                if (err.response.status === 409) {
                    this.searchResultStatus = "already";
                } else {
                    this.searchResultStatus = "error";
                }
            });
    };

    @action
    fetchSearchPeople = () => {
        axiosInstance
            .get(`/api/v1/accounts`, {
                params: {
                    q: this.searchValue,
                    skip: this.page * 15,
                    take: 15
                }
            })
            .then(({ data }) => {
                if (data.length > 0) {
                    this.searchResult.push(data);
                    this.pending = false;
                    this.page++;
                    console.log(this.searchResult);
                } else {
                    this.hasMore = false;
                }
            })
            .catch(err => {
                if (err.response.status === 409) {
                    this.searchResultStatus = "already";
                } else {
                    this.searchResultStatus = "error";
                }
            });
    };
}
